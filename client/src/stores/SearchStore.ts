import {
  action,
  makeObservable,
  observable,
  reaction,
  IReactionDisposer,
} from "mobx";

export class SearchStore {
  searchValue: string = "";
  debouncedSearchValue: string = "";

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private reactionDisposers: IReactionDisposer[] = [];

  constructor() {
    const initial = this.getSearchFromURL();

    this.searchValue = initial;
    this.debouncedSearchValue = initial;

    makeObservable(this, {
      searchValue: observable,
      debouncedSearchValue: observable,
      setSearchValue: action,
      clearSearch: action,
      updateDebouncedValue: action,
    });
  }

  private updateURL(value: string) {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newURL);
  }

  private initReaction() {
    // Setup reaction to debounce searchValue changes
    this.reactionDisposers.push(
      reaction(
        () => this.searchValue,
        (value) => {
          if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
          }
          this.debounceTimer = setTimeout(() => {
            this.updateDebouncedValue(value);
          }, 300);
        }
      )
    );
  }

  setSearchValue(value: string) {
    this.searchValue = value;
  }

  updateDebouncedValue(value: string) {
    this.debouncedSearchValue = value.trim();
    this.updateURL(this.debouncedSearchValue);
  }

  clearSearch() {
    this.searchValue = "";
    this.debouncedSearchValue = "";
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  private getSearchFromURL(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  }

  init() {
    this.initReaction();
  }

  dispose() {
    // Clean up the reaction
    if (this.reactionDisposers.length) {
      this.reactionDisposers.forEach((disposer) => disposer());
      this.reactionDisposers = [];
    }

    // Clear any pending timeout
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }
}

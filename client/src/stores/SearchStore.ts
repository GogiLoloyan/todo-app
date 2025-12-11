import { action, makeObservable, observable, reaction, IReactionDisposer } from "mobx";

export class SearchStore {
  searchValue: string = "";
  debouncedSearchValue: string = "";

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private reactionDisposer: IReactionDisposer | null = null;

  constructor() {
    makeObservable(this, {
      searchValue: observable,
      debouncedSearchValue: observable,
      setSearchValue: action,
      clearSearch: action,
      updateDebouncedValue: action,
    });

    // Setup reaction to debounce searchValue changes
    this.reactionDisposer = reaction(
      () => this.searchValue,
      (value) => {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = setTimeout(() => {
          this.updateDebouncedValue(value);
        }, 300);
      }
    );
  }

  setSearchValue(value: string) {
    this.searchValue = value;
  }

  updateDebouncedValue(value: string) {
    this.debouncedSearchValue = value;
  }

  clearSearch() {
    this.searchValue = "";
    this.debouncedSearchValue = "";
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  dispose() {
    // Clean up the reaction
    if (this.reactionDisposer) {
      this.reactionDisposer();
      this.reactionDisposer = null;
    }

    // Clear any pending timeout
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }
}

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { SearchStore } from "./SearchStore";

const SearchStoreContext = createContext<SearchStore>(
  null as unknown as SearchStore
);

interface SearchStoreProviderProps {
  children: ReactNode;
  store?: SearchStore;
}

export const SearchStoreProvider: React.FC<SearchStoreProviderProps> = ({
  children,
  store,
}) => {
  const [value] = useState(() => store ?? new SearchStore());

  /**
   * Cleanup the store when the provider unmounts
   */
  useEffect(() => {
    return () => {
      value.dispose();
    };
  }, [value]);

  return (
    <SearchStoreContext.Provider value={value}>
      {children}
    </SearchStoreContext.Provider>
  );
};

export const useSearchStore = (): SearchStore => {
  const store = useContext(SearchStoreContext);
  if (!store) {
    throw new Error("useSearchStore must be used within SearchStoreProvider");
  }
  return store;
};

import { observer } from "mobx-react-lite";
import { SearchBox } from "@fluentui/react/lib/SearchBox";

import { useSearchStore } from "../stores/SearchStoreContext";

const TodoSearchBox: React.FC = () => {
  const searchStore = useSearchStore();

  return (
    <SearchBox
      placeholder="Filter by name..."
      value={searchStore.searchValue}
      onClear={() => searchStore.setSearchValue("")}
      onChange={(_, newValue) => searchStore.setSearchValue(newValue ?? "")}
    />
  );
};

export default observer(TodoSearchBox);

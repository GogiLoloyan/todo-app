import { observer } from "mobx-react-lite";
import { MessageBar, MessageBarType } from "@fluentui/react";

import { TodoList } from "./TodoList";
import { LoadingShimmer } from "./LoadingShimmer";

import { useQuery } from "../hooks/useQuery";
import { todoService } from "../api/todoService";
import { useSearchStore } from "../stores/SearchStoreContext";

const TodoListContainer: React.FC = () => {
  const searchStore = useSearchStore();

  const { data, loading, error } = useQuery({
    queryKey: ["todos", "all", searchStore.debouncedSearchValue],
    queryFn: (context) =>
      todoService.getAll(context, { filter: searchStore.debouncedSearchValue }),
    initialData: [],
  });

  if (error) {
    return (
      <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
    );
  }

  if (loading) {
    return <LoadingShimmer />;
  }

  return <TodoList items={data ?? []} />;
};

export default observer(TodoListContainer);

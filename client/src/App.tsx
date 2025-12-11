import { useState } from "react";
import { Stack, Text, MessageBar, MessageBarType } from "@fluentui/react";

import { TodoList } from "./components/TodoList";
import { TodoSearchBox } from "./components/TodoSearchBox";
import { LoadingShimmer } from "./components/LoadingShimmer";

import { useQuery } from "./hooks/useQuery";
import { todoService } from "./api/todoService";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebouncedValue(searchValue, 300);

  const { data, loading, error } = useQuery({
    queryKey: ["todos", "all", debouncedSearch],
    queryFn: (context) =>
      todoService.getAll(context, { filter: debouncedSearch }),
    initialData: [],
  });

  return (
    <Stack
      tokens={{ padding: 20, childrenGap: 16 }}
      style={{ maxWidth: 800, margin: "0 auto" }}
    >
      <Text variant="xLarge">Todo App</Text>
      <TodoSearchBox value={searchValue} onChange={setSearchValue} />
      {error && (
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
      )}
      {loading ? <LoadingShimmer /> : <TodoList items={data ?? []} />}
    </Stack>
  );
};

export default App;

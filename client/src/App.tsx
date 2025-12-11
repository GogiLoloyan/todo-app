import { Stack, Text } from "@fluentui/react";

import { useQuery } from "./hooks/useQuery";
import { todoService } from "./api/todoService";

const App: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["todos", "all"],
    queryFn: (context) => todoService.getAll(context),
    initialData: [],
  });

  return (
    <Stack
      tokens={{ padding: 20, childrenGap: 16 }}
      style={{ maxWidth: 800, margin: "0 auto" }}
    >
      <Text variant="xLarge">Todo App</Text>

      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </Stack>
  );
};

export default App;

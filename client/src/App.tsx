import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";

import ErrorBoundary from "./components/ErrorBoundary";
import TodoSearchBox from "./components/TodoSearchBox";
import TodoListContainer from "./components/TodoListContainer";

const App: React.FC = () => {
  return (
    <Stack
      tokens={{ padding: 20, childrenGap: 16 }}
      style={{ maxWidth: 800, margin: "0 auto" }}
    >
      <Text variant="xLarge">Todo App</Text>
      <TodoSearchBox />
      <ErrorBoundary>
        <TodoListContainer />
      </ErrorBoundary>
    </Stack>
  );
};

export default App;

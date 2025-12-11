import { observer } from "mobx-react-lite";
import { Stack, Text } from "@fluentui/react";

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
      <TodoListContainer />
    </Stack>
  );
};

export default observer(App);

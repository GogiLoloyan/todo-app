import { DetailsList, IColumn, SelectionMode, Icon } from "@fluentui/react";
import type { TodoItem } from "@shared/types";

import HighlightText from "../utils/highlightText";

interface TodoListProps {
  items: TodoItem[];
  searchValue?: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  items,
  searchValue = "",
}) => {
  const columns: IColumn[] = [
    {
      key: "name",
      name: "Name",
      fieldName: "name",
      minWidth: 200,
      maxWidth: 400,
      isResizable: true,
      onRender: (item: TodoItem) => (
        <HighlightText text={item.name} highlight={searchValue} />
      ),
    },
    {
      key: "isComplete",
      name: "Complete",
      fieldName: "isComplete",
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: TodoItem) => (
        <Icon
          iconName={item.isComplete ? "CheckMark" : ""}
          styles={{
            root: { color: item.isComplete ? "#107c10" : undefined },
          }}
        />
      ),
    },
  ];

  return (
    <DetailsList
      items={items}
      columns={columns}
      isHeaderVisible={true}
      selectionMode={SelectionMode.none}
    />
  );
};

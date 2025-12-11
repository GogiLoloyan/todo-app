import { SearchBox } from "@fluentui/react";

interface TodoSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export const TodoSearchBox: React.FC<TodoSearchBoxProps> = ({
  value,
  onChange,
}) => {
  return (
    <SearchBox
      placeholder="Filter by name..."
      value={value}
      onChange={(_, newValue) => onChange(newValue ?? "")}
    />
  );
};

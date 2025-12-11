export interface TodoItem {
  id: number;
  name: string;
  isComplete: boolean;
}

// API Query Parameters
export type TodoItemsQueryParams = {
  filter?: string;
  /**
   * Future params for pagination and sorting can be added here:
   */
  // page?: number;
  // limit?: number;
  // sortBy?: keyof TodoItem;
  // sortOrder?: 'asc' | 'desc';
};

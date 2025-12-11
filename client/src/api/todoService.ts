import type { TodoItem, TodoItemsQueryParams } from "@shared/types";

import { ENDPOINTS } from "./configs";
import { HttpClient } from "./HttpClient";
import type { RequestContext } from "./types";

class TodoService {
  private http = new HttpClient();

  getAll(
    context?: RequestContext,
    params?: TodoItemsQueryParams
  ): Promise<TodoItem[]> {
    return this.http.get<TodoItem[]>(ENDPOINTS.TODOS, context, { params });
  }

  // --- For future expansion ---

  // create(context?: RequestContext, data?: Omit<TodoItem, 'id'>): Promise<TodoItem> {
  //   return this.http.post<TodoItem>(ENDPOINTS.TODOS, context, data);
  // }

  // update(context?: RequestContext, id?: number, data?: Partial<TodoItem>): Promise<TodoItem> {
  //   return this.http.put<TodoItem>(`${ENDPOINTS.TODOS}/${id}`, context, data);
  // }

  // delete(context?: RequestContext, id?: number): Promise<void> {
  //   return this.http.delete(`${ENDPOINTS.TODOS}/${id}`, context);
  // }
}

export const todoService = new TodoService();

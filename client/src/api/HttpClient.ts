import { API_BASE } from "./configs";
import type { RequestContext, RequestOptions } from "./types";

export class HttpClient {
  constructor(private readonly baseUrl: string = API_BASE) {}

  private buildUrl(path: string, params?: RequestOptions["params"]): string {
    const url = new URL(`${this.baseUrl}${path}`, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.set(key, String(value));
        } else {
          url.searchParams.delete(key);
        }
      });
    }

    return url.toString();
  }

  private async request<T>(
    method: string,
    path: string,
    context?: RequestContext,
    options?: RequestOptions
  ): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      method,
      signal: context?.signal,
      headers: options?.body
        ? { "Content-Type": "application/json" }
        : undefined,
      body: options?.body,
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  get<T>(
    path: string,
    context?: RequestContext,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("GET", path, context, options);
  }

  post<T>(
    path: string,
    context?: RequestContext,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("POST", path, context, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(
    path: string,
    context?: RequestContext,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PUT", path, context, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(
    path: string,
    context?: RequestContext,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("DELETE", path, context, options);
  }
}

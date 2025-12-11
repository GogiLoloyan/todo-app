export interface RequestContext {
  signal?: AbortSignal;
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

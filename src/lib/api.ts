const baseUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Public API client. Validate the returned data inside your feature before use. */
export async function request(path: string, options: RequestInit = {}): Promise<unknown> {
  if (!baseUrl) throw new Error('Укажите EXPO_PUBLIC_API_URL в .env и перезапустите Expo.');
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('API path must start with a single /.');
  const controller = new AbortController();
  const abort = () => controller.abort(options.signal?.reason);
  if (options.signal?.aborted) abort();
  else options.signal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(() => controller.abort(), 15_000);
  const headers = new Headers(options.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  try {
    const response = await fetch(`${baseUrl.replace(/\/+$/, '')}${path}`, { ...options, headers, signal: controller.signal });
    if (!response.ok) throw new ApiError(`Сервер вернул ошибку ${response.status}`, response.status);
    if (response.status === 204) return undefined;
    return await response.json();
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener('abort', abort);
  }
}

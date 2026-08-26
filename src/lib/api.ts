const API_BASE = import.meta.env.VITE_API_BASE;

function normalizeUrl(path: string): string {
  if (path.startsWith("/")) {
    return path;
  }
  return `/${path}`;
}
export async function apiClient<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${normalizeUrl(path)}`, {
    ...options,
  });
  if (!response.ok) {
    const message = (await response.text()).trim();
    throw new Error(message || `HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

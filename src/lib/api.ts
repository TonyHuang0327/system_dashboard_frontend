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
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

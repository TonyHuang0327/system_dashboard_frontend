import type { MetricsScenario } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE;

let metricsScenario: MetricsScenario = "normal";

export function getMetricsScenario(): MetricsScenario {
  return metricsScenario;
}

export function setMetricsScenario(next: MetricsScenario): void {
  metricsScenario = next;
}

function normalizeUrl(path: string): string {
  if (path.startsWith("/")) {
    return path;
  }
  return `/${path}`;
}

function withScenario(path: string): string {
  const url = new URL(`${API_BASE}${normalizeUrl(path)}`, window.location.origin);
  url.searchParams.set("scenario", metricsScenario);
  return url.toString();
}

export async function apiClient<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(withScenario(path), {
    ...options,
  });
  if (!response.ok) {
    const message = (await response.text()).trim();
    throw new Error(message || `HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

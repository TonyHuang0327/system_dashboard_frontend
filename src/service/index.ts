import { apiClient } from "../lib/api";
import type { CpuMetrics, DiskMetrics, RamMetrics } from "../types";

export function getCpuMetrics() {
  return apiClient<CpuMetrics>("/cpu");
}

export function getRamMetrics() {
  return apiClient<RamMetrics>("/ram");
}

export function getDiskMetrics() {
  return apiClient<DiskMetrics>("/disk");
}

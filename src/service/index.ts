import { apiClient } from "../lib/api";
import type { CpuResponse, DiskResponse, RamResponse } from "../types";

export function apiGetCpuMetrics() {
  return apiClient<CpuResponse>("/cpu");
}

export function apiGetRamMetrics() {
  return apiClient<RamResponse>("/ram");
}

export function apiGetDiskMetrics() {
  return apiClient<DiskResponse>("/disk");
}

import { useQuery } from "@tanstack/react-query";
import { apiGetCpuMetrics, apiGetDiskMetrics, apiGetRamMetrics } from "../service";
import { metricsKeys } from "./key";

export function useCpuMetrics() {
  return useQuery({
    queryKey: metricsKeys.cpu,
    queryFn: apiGetCpuMetrics,
    refetchInterval: 1000,
  });
}

export function useRamMetrics() {
  return useQuery({
    queryKey: metricsKeys.ram,
    queryFn: apiGetRamMetrics,
    refetchInterval: 1000,
  });
}

export function useDiskMetrics() {
  return useQuery({
    queryKey: metricsKeys.disk,
    queryFn: apiGetDiskMetrics,
    refetchInterval: 1000,
  });
}

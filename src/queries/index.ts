import { useQuery } from "@tanstack/react-query";
import { getCpuMetrics, getDiskMetrics, getRamMetrics } from "../service";
import { metricsKeys } from "./key";

// TODO: add refetchInterval: 1000
export function useCpuMetrics() {
  return useQuery({
    queryKey: metricsKeys.cpu,
    queryFn: getCpuMetrics,
  });
}

export function useRamMetrics() {
  return useQuery({
    queryKey: metricsKeys.ram,
    queryFn: getRamMetrics,
  });
}

export function useDiskMetrics() {
  return useQuery({
    queryKey: metricsKeys.disk,
    queryFn: getDiskMetrics,
  });
}

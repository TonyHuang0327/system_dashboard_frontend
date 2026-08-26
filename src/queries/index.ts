import { useQuery } from "@tanstack/react-query";
import { getCpuMetrics, getDiskMetrics, getRamMetrics } from "../service";
import { metricsKeys } from "./key";

export function useCpuMetrics() {
  return useQuery({
    queryKey: metricsKeys.cpu,
    queryFn: getCpuMetrics,
    refetchInterval: 1000,
  });
}

export function useRamMetrics() {
  return useQuery({
    queryKey: metricsKeys.ram,
    queryFn: getRamMetrics,
    refetchInterval: 1000,
  });
}

export function useDiskMetrics() {
  return useQuery({
    queryKey: metricsKeys.disk,
    queryFn: getDiskMetrics,
    refetchInterval: 1000,
  });
}

import { useQuery } from "@tanstack/react-query";
import {
  apiGetCpuMetrics,
  apiGetDiskMetrics,
  apiGetRamMetrics,
} from "../service";
import { metricsKeys } from "./key";

const metricsQueryOptions = {
  retry: 1,
  refetchInterval: (query: { state: { status: string } }) =>
    query.state.status === "success" ? 1000 : 5000,
};

export function useCpuMetrics() {
  return useQuery({
    queryKey: metricsKeys.cpu,
    queryFn: apiGetCpuMetrics,
    ...metricsQueryOptions,
  });
}

export function useRamMetrics() {
  return useQuery({
    queryKey: metricsKeys.ram,
    queryFn: apiGetRamMetrics,
    ...metricsQueryOptions,
  });
}

export function useDiskMetrics() {
  return useQuery({
    queryKey: metricsKeys.disk,
    queryFn: apiGetDiskMetrics,
    ...metricsQueryOptions,
  });
}

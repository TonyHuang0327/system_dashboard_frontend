import { useEffect, useState } from "react";
import { useDiskMetrics } from "../queries";

export type DiskHistorySlice = {
  disk_name: string;
  usage: number;
};

export type DiskHistoryPoint = {
  timestamp: string;
  disks: DiskHistorySlice[];
};

const MAX_POINTS = 10;

/** 依 Disk snapshot 的 timestamp 累積最多 10 點 */
export function useDiskHistory() {
  const { data } = useDiskMetrics();
  const [history, setHistory] = useState<DiskHistoryPoint[]>([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setHistory((prev) => {
      if (prev.at(-1)?.timestamp === data.timestamp) {
        return prev;
      }

      return [
        ...prev,
        {
          timestamp: data.timestamp,
          disks: data.disks.map((item) => ({
            disk_name: item.disk_name,
            usage: Math.round((item.used / item.max) * 100),
          })),
        },
      ].slice(-MAX_POINTS);
    });
  }, [data]);

  return history;
}

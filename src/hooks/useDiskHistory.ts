import { useEffect, useState } from "react";
import { useDiskMetrics } from "../queries";

export type DiskHistoryPoint = {
  timestamp: string;
  usage: number;
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
          usage: Math.round((data.used / data.total) * 100),
        },
      ].slice(-MAX_POINTS);
    });
  }, [data]);

  return history;
}

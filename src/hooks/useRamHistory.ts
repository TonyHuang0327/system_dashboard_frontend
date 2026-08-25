import { useEffect, useState } from "react";
import { useRamMetrics } from "../queries";

export type RamHistoryPoint = {
  timestamp: string;
  usage: number;
};

const MAX_POINTS = 10;

/** 依 RAM snapshot 的 timestamp 累積最多 10 點 */
export function useRamHistory() {
  const { data } = useRamMetrics();
  const [history, setHistory] = useState<RamHistoryPoint[]>([]);

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
          usage: Math.round((data.used / data.max) * 100),
        },
      ].slice(-MAX_POINTS);
    });
  }, [data]);

  return history;
}

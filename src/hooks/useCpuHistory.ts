import { useEffect, useState } from 'react'
import { useCpuMetrics } from '../queries'

export type CpuHistoryPoint = {
  timestamp: string
  usage: number
  temperature: number
}

const MAX_POINTS = 10

/** 依 CPU snapshot 的 timestamp 累積最多 10 點（約 10 秒） */
export function useCpuHistory() {
  const { data } = useCpuMetrics()
  const [history, setHistory] = useState<CpuHistoryPoint[]>([])

  useEffect(() => {
    if (!data) {
      return
    }

    setHistory((prev) => {
      if (prev.at(-1)?.timestamp === data.timestamp) {
        return prev
      }

      return [
        ...prev,
        {
          timestamp: data.timestamp,
          usage: data.usage,
          temperature: data.temperature,
        },
      ].slice(-MAX_POINTS)
    })
  }, [data])

  return history
}

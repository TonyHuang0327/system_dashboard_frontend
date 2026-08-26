/** 測試場景：正常打真實 API，其餘由 MSW 依 query 模擬 */
export type MetricsScenario = "normal" | "high" | "error";

/** CPU 當下快照 */
export type CpuResponse = {
  cpuName: string
  coreNumber: number
  /** 0–100 */
  usage: number
  timestamp: string
}

/** 整機 RAM 當下快照；total / used 單位為 byte */
export type RamResponse = {
  total: number
  used: number
  timestamp: string
}

/** 磁碟當下快照 */
export type DiskResponse = {
  total: number
  used: number
  timestamp: string
}

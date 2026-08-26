/** Test scenario: normal hits the real API; others are mocked via MSW */
export type MetricsScenario = "normal" | "high" | "error";

/** CPU snapshot */
export type CpuResponse = {
  cpuName: string
  coreNumber: number
  /** 0–100 */
  usage: number
  timestamp: string
}

/** RAM snapshot; total / used are in bytes */
export type RamResponse = {
  total: number
  used: number
  timestamp: string
}

/** Disk snapshot */
export type DiskResponse = {
  total: number
  used: number
  timestamp: string
}

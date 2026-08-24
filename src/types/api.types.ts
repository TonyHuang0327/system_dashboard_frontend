/** CPU 使用率為 0–100，溫度為攝氏 */
export type CpuMetrics = {
  name: string
  usage: number
  temperature: number
  timestamp: string
}

/** max / used 單位為 KB */
export type RamMetrics = {
  max: number
  used: number
  timestamp: string
}

/** max / used 單位為 KB，溫度為攝氏 */
export type DiskItem = {
  disk_name: string
  max: number
  used: number
  temperature: number
}

export type DiskMetrics = {
  timestamp: string
  disks: DiskItem[]
}

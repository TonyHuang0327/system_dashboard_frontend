import { http, HttpResponse } from "msw";
import type { CpuResponse, DiskResponse, RamResponse } from "../types";

const GiB = 1024 ** 3;

export const handlers = [
  http.get("*/api/cpu", () => {
    const body: CpuResponse = {
      cpuName: "i5-14400F",
      coreNumber: 10,
      usage: 30,
      timestamp: new Date().toISOString(),
    };
    return HttpResponse.json(body);
  }),
  http.get("*/api/ram", () => {
    const body: RamResponse = {
      total: 32 * GiB,
      used: 16 * GiB,
      timestamp: new Date().toISOString(),
    };
    return HttpResponse.json(body);
  }),
  http.get("*/api/disk", () => {
    const body: DiskResponse = {
      total: 512 * GiB,
      used: 180 * GiB,
      timestamp: new Date().toISOString(),
    };
    return HttpResponse.json(body);
  }),
];

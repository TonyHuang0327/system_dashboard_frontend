import { http, HttpResponse } from "msw";
import type { CpuMetrics, DiskMetrics, RamMetrics } from "../types";

export const handlers = [
  http.get("*/api/cpu", () => {
    const body: CpuMetrics = {
      name: "i5-14400F",
      usage: 30,
      temperature: 75,
      timestamp: new Date().toISOString(),
    };
    return HttpResponse.json(body);
  }),
  http.get("*/api/ram", () => {
    const body: RamMetrics = {
      max: 33554432,
      used: 16777216,
      timestamp: new Date().toISOString(),
    };
    return HttpResponse.json(body);
  }),
  http.get("*/api/disk", () => {
    const body: DiskMetrics = {
      timestamp: new Date().toISOString(),
      disks: [
        {
          disk_name: "C:",
          max: 536870912,
          used: 188743680,
          temperature: 41,
        },
        {
          disk_name: "D:",
          max: 1073741824,
          used: 419430400,
          temperature: 38,
        },
      ],
    };
    return HttpResponse.json(body);
  }),
];

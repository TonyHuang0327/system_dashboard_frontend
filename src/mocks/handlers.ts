import { http, HttpResponse, passthrough } from "msw";
import { getMetricsScenario } from "../lib/api";
import type { CpuResponse, DiskResponse, RamResponse } from "../types";

const GiB = 1024 ** 3;

function handleCpu() {
  const scenario = getMetricsScenario();
  if (scenario === "normal") {
    return passthrough();
  }
  if (scenario === "error") {
    return HttpResponse.error();
  }
  const body: CpuResponse = {
    cpuName: "i5-14400F",
    coreNumber: 10,
    usage: 92,
    timestamp: new Date().toISOString(),
  };
  return HttpResponse.json(body);
}

function handleRam() {
  const scenario = getMetricsScenario();
  if (scenario === "normal") {
    return passthrough();
  }
  if (scenario === "error") {
    return HttpResponse.error();
  }
  const body: RamResponse = {
    total: 32 * GiB,
    used: 28 * GiB,
    timestamp: new Date().toISOString(),
  };
  return HttpResponse.json(body);
}

function handleDisk() {
  const scenario = getMetricsScenario();
  if (scenario === "normal") {
    return passthrough();
  }
  if (scenario === "error") {
    return HttpResponse.error();
  }
  const body: DiskResponse = {
    total: 512 * GiB,
    used: 450 * GiB,
    timestamp: new Date().toISOString(),
  };
  return HttpResponse.json(body);
}

export const handlers = [
  http.get("*/api/cpu", handleCpu),
  http.get("*/api/ram", handleRam),
  http.get("*/api/disk", handleDisk),
];

import { Box, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useCpuHistory } from "../hooks/useCpuHistory";
import { useDiskHistory } from "../hooks/useDiskHistory";
import { useRamHistory } from "../hooks/useRamHistory";
import type { ChartMode } from "../types";

const formatTick = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

const DISK_COLORS = ["#38BDF8", "#A78BFA", "#F59E0B"];

const xAxis = [
  {
    scaleType: "point" as const,
    height: 40,
    tickLabelStyle: {
      fontSize: 11,
      fill: "#94A3B8",
    },
  },
];

type MetricsHistoryChartProps = {
  mode: ChartMode;
};

export function MetricsHistoryChart({ mode }: MetricsHistoryChartProps) {
  const cpuHistory = useCpuHistory();
  const ramHistory = useRamHistory();
  const diskHistory = useDiskHistory();

  const title = mode === "cpu" ? "CPU" : mode === "ram" ? "RAM" : "Disk";

  const history =
    mode === "cpu" ? cpuHistory : mode === "ram" ? ramHistory : diskHistory;

  const xLabels = history.map((item) => formatTick(item.timestamp));

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        p: 1,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" component="h2">
        {title}
      </Typography>
      {history.length < 2 ? (
        <Typography variant="body2" color="text.secondary">
          Waiting for samples…
        </Typography>
      ) : (
        <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
          {mode === "cpu" ? (
            <LineChart
              skipAnimation
              series={[
                {
                  id: "usage",
                  data: cpuHistory.map((item) => item.usage),
                  label: "Usage %",
                  color: "#22C55E",
                  yAxisId: "usage",
                  area: true,
                },
                {
                  id: "temp",
                  data: cpuHistory.map((item) => item.temperature),
                  label: "Temperature °C",
                  color: "#EF4444",
                  yAxisId: "temp",
                },
              ]}
              xAxis={[{ ...xAxis[0], data: xLabels }]}
              yAxis={[
                {
                  id: "usage",
                  min: 0,
                  max: 100,
                  label: "Usage %",
                  width: 50,
                },
                {
                  id: "temp",
                  min: 0,
                  max: 120,
                  position: "right",
                  label: "°C",
                  width: 50,
                },
              ]}
            />
          ) : mode === "ram" ? (
            <LineChart
              skipAnimation
              series={[
                {
                  id: "usage",
                  data: ramHistory.map((item) => item.usage),
                  label: "Usage %",
                  color: "#22C55E",
                  area: true,
                },
              ]}
              xAxis={[{ ...xAxis[0], data: xLabels }]}
              yAxis={[{ min: 0, max: 100, label: "Usage %", width: 50 }]}
            />
          ) : (
            <LineChart
              skipAnimation
              series={diskNames(diskHistory).map((name, index) => ({
                id: name,
                label: name,
                color: DISK_COLORS[index % DISK_COLORS.length],
                data: diskHistory.map(
                  (point) =>
                    point.disks.find((disk) => disk.disk_name === name)
                      ?.usage ?? null,
                ),
              }))}
              xAxis={[{ ...xAxis[0], data: xLabels }]}
              yAxis={[{ min: 0, max: 100, label: "Usage %", width: 50 }]}
            />
          )}
        </Box>
      )}
    </Paper>
  );
}

function diskNames(
  history: { disks: { disk_name: string }[] }[],
): string[] {
  const names: string[] = [];
  for (const point of history) {
    for (const disk of point.disks) {
      if (!names.includes(disk.disk_name)) {
        names.push(disk.disk_name);
      }
    }
  }
  return names;
}

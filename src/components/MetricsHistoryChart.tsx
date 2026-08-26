import { Box, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useCpuHistory } from "../hooks/useCpuHistory";
import { useDiskHistory } from "../hooks/useDiskHistory";
import { useRamHistory } from "../hooks/useRamHistory";
import { useCpuMetrics, useDiskMetrics, useRamMetrics } from "../queries";
import type { ChartMode } from "../types";

const formatTick = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

type MetricsHistoryChartProps = {
  mode: ChartMode;
};

export function MetricsHistoryChart({ mode }: MetricsHistoryChartProps) {
  const theme = useTheme();
  const cpuHistory = useCpuHistory();
  const ramHistory = useRamHistory();
  const diskHistory = useDiskHistory();
  const cpuQuery = useCpuMetrics();
  const ramQuery = useRamMetrics();
  const diskQuery = useDiskMetrics();

  const title = mode === "cpu" ? "CPU" : mode === "ram" ? "RAM" : "Disk";
  const history =
    mode === "cpu" ? cpuHistory : mode === "ram" ? ramHistory : diskHistory;
  const query =
    mode === "cpu" ? cpuQuery : mode === "ram" ? ramQuery : diskQuery;
  const xLabels = history.map((item) => formatTick(item.timestamp));
  const isHigh = (history.at(-1)?.usage ?? 0) >= 80;
  const lineColor = isHigh
    ? theme.palette.error.main
    : theme.palette.success.main;
  const showError = query.isError && history.length < 2;
  const showSkeleton = !showError && history.length < 2;

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
        borderColor: showError ? "error.main" : "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" component="h2">
        {title}
      </Typography>
      {showError ? (
        <Typography variant="body2" color="error.main" sx={{ py: 1 }}>
          Unable to render {title} trend
        </Typography>
      ) : showSkeleton ? (
        <Box aria-busy sx={{ flex: 1, minHeight: 0, width: "100%", pt: 1 }}>
          <Skeleton variant="rounded" height="100%" width="100%" />
        </Box>
      ) : (
        <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
          <LineChart
            skipAnimation
            series={[
              {
                id: "usage",
                data: history.map((item) => item.usage),
                label: "Usage %",
                color: lineColor,
                area: true,
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: xLabels,
                height: 40,
                tickLabelStyle: {
                  fontSize: 11,
                  fill: "#94A3B8",
                },
              },
            ]}
            yAxis={[{ min: 0, max: 100, label: "Usage %", width: 50 }]}
          />
        </Box>
      )}
    </Paper>
  );
}

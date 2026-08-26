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
          <LineChart
            skipAnimation
            series={[
              {
                id: "usage",
                data: history.map((item) => item.usage),
                label: "Usage %",
                color: "#22C55E",
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

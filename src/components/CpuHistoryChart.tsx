import { Box, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useCpuHistory } from "../hooks/useCpuHistory";

const formatTick = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

export function CpuHistoryChart() {
  const history = useCpuHistory();
  const usageData = history.map((item) => item.usage);
  const temperatureData = history.map((item) => item.temperature);
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
        CPU
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
                data: usageData,
                label: "Usage %",
                color: "#22C55E",
                yAxisId: "usage",
                area: true,
              },
              {
                id: "temp",
                data: temperatureData,
                label: "Temperature °C",
                color: "#EF4444",
                yAxisId: "temp",
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
        </Box>
      )}
    </Paper>
  );
}

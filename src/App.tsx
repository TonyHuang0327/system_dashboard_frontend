import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { KpiButtonGroup } from "./components/KpiButton";
import { MetricsHistoryChart } from "./components/MetricsHistoryChart";
import type { ChartMode } from "./types";

function App() {
  const [chartMode, setChartMode] = useState<ChartMode>("cpu");

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        p: 1,
        minHeight: "100dvh",
        height: { sm: "100dvh" },
        overflow: { xs: "auto", sm: "hidden" },
        minWidth: 0,
      }}
    >
      <Typography variant="h5">System Dashboard</Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ flex: 1, minHeight: 0 }}
      >
        <KpiButtonGroup
          chartMode={chartMode}
          onChartModeChange={setChartMode}
        />
        <Stack
          sx={{
            width: { xs: "100%", sm: "80%" },
            minWidth: 0,
            height: { xs: 280, sm: "100%" },
            flex: { sm: 1 },
          }}
        >
          <MetricsHistoryChart mode={chartMode} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;

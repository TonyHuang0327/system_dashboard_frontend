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
      sx={{ height: "100dvh", p: 1, minHeight: 0 }}
    >
      <Typography variant="h5">System Dashboard</Typography>
      <Stack direction="row" spacing={1} sx={{ flex: 1, minHeight: 0 }}>
        <KpiButtonGroup
          chartMode={chartMode}
          onChartModeChange={setChartMode}
        />
        <Stack sx={{ width: "80%", minWidth: 0, minHeight: 0 }}>
          <MetricsHistoryChart mode={chartMode} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;

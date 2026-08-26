import { useState, type MouseEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { KpiButtonGroup } from "./components/KpiButton";
import { MetricsHistoryChart } from "./components/MetricsHistoryChart";
import { setMetricsScenario } from "./lib/api";
import type { ChartMode, MetricsScenario } from "./types";

function App() {
  const queryClient = useQueryClient();
  const [chartMode, setChartMode] = useState<ChartMode>("cpu");
  const [scenario, setScenario] = useState<MetricsScenario>("normal");

  const handleScenarioChange = (
    _: MouseEvent<HTMLElement>,
    next: MetricsScenario | null,
  ) => {
    if (next == null) {
      return;
    }
    setMetricsScenario(next);
    setScenario(next);
    void queryClient.resetQueries();
  };

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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "flex-start" },
        }}
      >
        <Typography variant="h5">System Dashboard</Typography>
        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={scenario}
            onChange={handleScenarioChange}
            aria-label="Test scenario"
          >
            <ToggleButton value="normal" aria-label="Normal">
              Normal
            </ToggleButton>
            <ToggleButton value="high" aria-label="High load">
              High load
            </ToggleButton>
            <ToggleButton value="error" aria-label="Offline">
              Offline
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
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
            width: { xs: "100%", sm: "70%" },
            minWidth: 0,
            height: { xs: 280, sm: "100%" },
            flex: { sm: 1 },
          }}
        >
          <MetricsHistoryChart key={scenario} mode={chartMode} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;

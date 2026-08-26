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
    void queryClient.invalidateQueries();
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
            aria-label="測試場景"
            sx={{
              flexWrap: "wrap",
              "& .MuiToggleButton-root": { minHeight: 44, px: 1.5 },
            }}
          >
            <ToggleButton value="normal" aria-label="正常">
              正常
            </ToggleButton>
            <ToggleButton value="high" aria-label="高負載">
              高負載
            </ToggleButton>
            <ToggleButton value="error" aria-label="斷線">
              斷線
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
            width: { xs: "100%", sm: "80%" },
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

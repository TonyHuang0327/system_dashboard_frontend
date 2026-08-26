import { Button, Stack, Typography } from "@mui/material";
import { useCpuMetrics, useDiskMetrics, useRamMetrics } from "../queries";
import type { ChartMode } from "../types";

const bytesToGiB = (bytes: number) => bytes / 1024 ** 3;

const usedOverTotal = (used: number, total: number) =>
  `${bytesToGiB(used).toFixed(0)} / ${bytesToGiB(total).toFixed(0)} GB`;

type KpiButtonGroupProps = {
  chartMode: ChartMode;
  onChartModeChange: (mode: ChartMode) => void;
};

export const KpiButtonGroup = ({
  chartMode,
  onChartModeChange,
}: KpiButtonGroupProps) => {
  const cpu = useCpuMetrics();
  const ram = useRamMetrics();
  const disk = useDiskMetrics();

  const ramPercent =
    ram.data !== undefined
      ? Math.round((ram.data.used / ram.data.total) * 100)
      : undefined;

  const diskPercent =
    disk.data !== undefined
      ? Math.round((disk.data.used / disk.data.total) * 100)
      : undefined;

  return (
    <Stack spacing={1} sx={{ width: "20%", minWidth: 0 }}>
      <KpiButton
        label="CPU"
        selected={chartMode === "cpu"}
        onClick={() => onChartModeChange("cpu")}
        primary={cpu.data !== undefined ? `${cpu.data.usage}%` : undefined}
        details={
          cpu.data
            ? [cpu.data.cpuName, `${cpu.data.coreNumber} cores`]
            : undefined
        }
        isHigh={cpu.data !== undefined && cpu.data.usage >= 80}
        isPending={cpu.isPending}
        isError={cpu.isError}
        errorMessage={
          cpu.error instanceof Error ? cpu.error.message : undefined
        }
      />
      <KpiButton
        label="RAM"
        selected={chartMode === "ram"}
        onClick={() => onChartModeChange("ram")}
        primary={ramPercent !== undefined ? `${ramPercent}%` : undefined}
        details={
          ram.data
            ? [usedOverTotal(ram.data.used, ram.data.total)]
            : undefined
        }
        isHigh={ramPercent !== undefined && ramPercent >= 80}
        isPending={ram.isPending}
        isError={ram.isError}
        errorMessage={
          ram.error instanceof Error ? ram.error.message : undefined
        }
      />
      <KpiButton
        label="Disk"
        selected={chartMode === "disk"}
        onClick={() => onChartModeChange("disk")}
        primary={diskPercent !== undefined ? `${diskPercent}%` : undefined}
        details={
          disk.data
            ? [usedOverTotal(disk.data.used, disk.data.total)]
            : undefined
        }
        isHigh={diskPercent !== undefined && diskPercent >= 80}
        isPending={disk.isPending}
        isError={disk.isError}
        errorMessage={
          disk.error instanceof Error ? disk.error.message : undefined
        }
      />
    </Stack>
  );
};

type KpiButtonProps = {
  label: string;
  primary?: string;
  details?: string[];
  isHigh?: boolean;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  selected: boolean;
  onClick: () => void;
};

export const KpiButton = ({
  label,
  primary,
  details,
  isHigh = false,
  isPending,
  isError,
  errorMessage,
  selected,
  onClick,
}: KpiButtonProps) => {
  const statusColor = isError || isHigh ? "error.main" : "success.main";

  return (
    <Button
      variant="contained"
      title={isError ? errorMessage : undefined}
      aria-pressed={selected}
      onClick={onClick}
      sx={{
        border: "2px solid",
        borderColor: selected ? "success.main" : "divider",
        borderRadius: 1,
        height: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        textAlign: "left",
        textTransform: "none",
        py: 1,
        px: 1.5,
      }}
    >
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ lineHeight: 1.2 }}
      >
        {label}
      </Typography>
      {isPending ? (
        <Typography variant="body2" color="text.secondary">
          Loading
        </Typography>
      ) : isError ? (
        <Typography variant="body2" color="error.main">
          Error
        </Typography>
      ) : primary ? (
        <Stack spacing={0.25} sx={{ width: "100%", minWidth: 0 }}>
          <Typography
            variant="h5"
            component="span"
            color={statusColor}
            sx={{ fontWeight: 700, lineHeight: 1.1 }}
          >
            {primary}
          </Typography>
          <Typography variant="caption" color={statusColor}>
            {isHigh ? "High" : "Normal"}
          </Typography>
          {details?.map((line) => (
            <Typography
              key={line}
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </Typography>
          ))}
        </Stack>
      ) : null}
    </Button>
  );
};

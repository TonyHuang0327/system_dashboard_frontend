import { Box, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import { type KeyboardEvent } from "react";
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

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <Stack
      spacing={1}
      sx={{ width: isSmallScreen ? "100%" : "20%", minWidth: 0 }}
    >
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
          ram.data ? [usedOverTotal(ram.data.used, ram.data.total)] : undefined
        }
        isHigh={ramPercent !== undefined && ramPercent >= 80}
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
  isError,
  errorMessage,
  selected,
  onClick,
}: KpiButtonProps) => {
  const hasData = primary !== undefined;
  const statusColor = isHigh ? "error.main" : "success.main";

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };
  return (
    <Box
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-busy={!hasData && !isError ? true : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
      sx={{
        border: "2px solid",
        borderColor:
          isError && !hasData
            ? "error.main"
            : selected
              ? "success.main"
              : "divider",
        borderRadius: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        textAlign: "left",
        py: 1,
        px: 1.5,
        cursor: "pointer",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        outline: "none",
        "&:focus-visible": {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        },
      }}
    >
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ lineHeight: 1.2 }}
      >
        {label}
      </Typography>
      {hasData ? (
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
      ) : isError ? (
        <Stack spacing={0.75} sx={{ width: "100%", minWidth: 0 }}>
          <Typography variant="body2" color="error.main">
            無法取得 {label} 資料
          </Typography>
          <Typography
            role="alert"
            variant="caption"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {errorMessage ?? "請稍後再試"}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            5秒後重試...
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={0.75} sx={{ width: "100%" }}>
          <Skeleton variant="rounded" height={28} width="55%" />
          <Skeleton variant="text" width="70%" />
        </Stack>
      )}
    </Box>
  );
};

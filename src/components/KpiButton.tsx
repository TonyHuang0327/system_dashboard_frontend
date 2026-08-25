import { Button, Stack, Typography } from "@mui/material";
import { useCpuMetrics, useDiskMetrics, useRamMetrics } from "../queries";

const kbToGiB = (kb: number) => kb / (1024 * 1024);

export const KpiButtonGroup = () => {
  const cpu = useCpuMetrics();
  const ram = useRamMetrics();
  const disk = useDiskMetrics();

  const ramPercent =
    ram.data !== undefined
      ? Math.round((ram.data.used / ram.data.max) * 100)
      : undefined;

  const diskPercent =
    disk.data !== undefined
      ? Math.round(
          (disk.data.disks.reduce((sum, item) => sum + item.used, 0) /
            disk.data.disks.reduce((sum, item) => sum + item.max, 0)) *
            100,
        )
      : undefined;

  return (
    <Stack spacing={1} sx={{ width: "20%", minWidth: 0 }}>
      <KpiButton
        label="CPU"
        primary={cpu.data !== undefined ? `${cpu.data.usage}%` : undefined}
        details={
          cpu.data ? [cpu.data.name, `${cpu.data.temperature} °C`] : undefined
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
        primary={ramPercent !== undefined ? `${ramPercent}%` : undefined}
        details={
          ram.data
            ? [
                `${kbToGiB(ram.data.used).toFixed(0)} / ${kbToGiB(ram.data.max).toFixed(0)} GB`,
              ]
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
        primary={diskPercent !== undefined ? `${diskPercent}%` : undefined}
        details={
          disk.data
            ? disk.data.disks.map(
                (item) => `${item.disk_name} ${item.temperature} °C`,
              )
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
};

export const KpiButton = ({
  label,
  primary,
  details,
  isHigh = false,
  isPending,
  isError,
  errorMessage,
}: KpiButtonProps) => {
  const statusColor = isError || isHigh ? "error.main" : "success.main";

  return (
    <Button
      variant="contained"
      title={isError ? errorMessage : undefined}
      sx={{
        border: "1px solid",
        borderColor: "divider",
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

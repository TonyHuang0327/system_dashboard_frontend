import { Stack, Typography } from '@mui/material'
import { CpuHistoryChart } from './components/CpuHistoryChart'
import { KpiButtonGroup } from './components/KpiButton'

function App() {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ height: '100dvh', p: 1, minHeight: 0 }}
    >
      <Typography variant="h5">System Dashboard</Typography>
      <Stack direction="row" spacing={1} sx={{ flex: 1, minHeight: 0 }}>
        <KpiButtonGroup />
        <Stack sx={{ width: '80%', minWidth: 0, minHeight: 0 }}>
          <CpuHistoryChart />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default App

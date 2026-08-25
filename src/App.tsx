import { Box, Stack, Typography } from '@mui/material'
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
        <Box
          sx={{
            width: '70%',
            minWidth: 0,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
          }}
        >
          折線圖
        </Box>
      </Stack>
    </Stack>
  )
}

export default App

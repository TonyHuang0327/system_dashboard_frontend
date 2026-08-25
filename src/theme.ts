import { createTheme } from '@mui/material/styles'

/** 深色 ops 儀表板（ui-ux-pro-max：slate + status green） */
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E293B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#334155',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#22C55E',
      contrastText: '#0F172A',
    },
    error: {
      main: '#EF4444',
      contrastText: '#000000',
    },
    background: {
      default: '#0F172A',
      paper: '#1B2336',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    divider: '#475569',
  },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, "Segoe UI", Roboto, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})

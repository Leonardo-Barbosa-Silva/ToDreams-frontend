import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme/index.js';
import IndexRoutes from "./pages/index.js";


export default function App() {

  const { mode } = useSelector( state => state.auth )
  const theme = useMemo( () => createTheme(themeSettings(mode)), [mode] )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IndexRoutes />
    </ThemeProvider>
  )
}

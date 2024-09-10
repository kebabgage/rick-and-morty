import {
  alpha,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

const theme = createTheme({
  typography: { fontFamily: ["SUSE", "cursive"].join(",") },
  palette: {
    primary: {
      main: alpha("#3E54D3", 0.8),
    },
    secondary: {
      main: alpha("#13CDCA", 0.4),
      light: alpha("#13CDCA", 0.2),
    },
  },
});

interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

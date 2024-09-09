import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: { fontFamily: ["SUSE", "cursive"].join(",") },
  palette: {
    primary: {
      main: "#3E54D3",
    },
    secondary: {
      main: "#13CDCA",
    },
  },
});

interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

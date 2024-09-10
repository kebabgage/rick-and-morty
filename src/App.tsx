import { Box, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharacterTable } from "./components/CharacterTable";
import { ThemeProvider } from "./util/ThemeProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h3" paddingBottom={3}>
            Rick and Morty Characters
          </Typography>
          <CharacterTable />
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

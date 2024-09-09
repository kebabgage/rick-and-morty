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
          }}
        >
          <Typography variant="h3" paddingBottom={4}>
            Rick and Morty Characters
          </Typography>
          <CharacterTable />
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

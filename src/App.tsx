import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CharacterTable } from "./components/Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
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
            Best Rick and Morty
          </Typography>
          <CharacterTable />
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

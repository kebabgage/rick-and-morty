import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableRow } from "./TableRow";
import { Search } from "@mui/icons-material";

interface Character {}

interface ApiResponse {
  info: {
    // The total count of items
    count: number;

    // The previous page
    prev: string | null;

    // The next page
    next: string | null;

    // The total number of pages
    pages: number;
  };

  results: Character[];
}

interface TableProps {}

export const CharacterTable = ({}: TableProps) => {
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const queryFn = async (page: number = 0) => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    return res.json() as unknown as ApiResponse;
  };

  const { data, isPending, isError } = useQuery({
    queryFn: () => queryFn(page),
    queryKey: ["character"],
  });

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert>Something went wrong!</Alert>;
  }

  return (
    <Box sx={{ width: "75%" }}>
      <TextField
        sx={{ justifySelf: "flex-start" }}
        value={searchValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
        }}
        placeholder="Search"
        slotProps={{
          input: {
            startAdornment: <Search />,
          },
        }}
      />
      {data.results.map((character) => (
        <TableRow character={character} />
      ))}
      <Button>Previous</Button>
      <Button>Next</Button>
    </Box>
  );
};

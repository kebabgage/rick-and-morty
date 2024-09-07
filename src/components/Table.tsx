import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableRow } from "./TableRow";
import { Search } from "@mui/icons-material";
import { TableHeader } from "./TableHeader";
import { Character } from "../types/Character";
import { CharacterOverview } from "./CharacterOverview";

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
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

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
    <Box sx={{ width: "85%", paddingBottom: 2 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          paddingBottom: 1,
        }}
      >
        <TextField
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
          size="small"
        />
      </Box>
      <Box
        sx={{ border: "1.5px solid rgba(0, 0, 0, 0.25)", borderRadius: "4px" }}
      >
        <TableHeader
          columnValues={[
            { value: "Name", columnSize: 2 },
            { value: "Gender", columnSize: 1 },
            { value: "Status", columnSize: 1 },
            { value: "Species", columnSize: 1 },
            { value: "Location", columnSize: 2.75 },
            { value: "Origin", columnSize: 2.75 },
            { value: "Episodes", columnSize: 1 },
          ]}
        />
        <Divider />
        {data.results.map((character, index, results) => (
          <>
            <TableRow
              columnValues={[
                { value: character.name, columnSize: 2 },
                { value: character.gender, columnSize: 1 },
                { value: character.status, columnSize: 1 },
                { value: character.species, columnSize: 1 },
                { value: character.location?.name, columnSize: 2.75 },
                { value: character.origin?.name, columnSize: 2.75 },
                { value: String(character.episode.length), columnSize: 1 },
              ]}
              index={index}
              // TODO: Fix typings
              onClick={() => {
                if (selectedCharacter) {
                  setSelectedCharacter(null);
                } else {
                  setSelectedCharacter(character.name ?? "");
                }
              }}
              selected={selectedCharacter === character.name}
            />
            <Divider />
            {selectedCharacter === character.name && (
              <CharacterOverview character={character} />
            )}
          </>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "right", paddingTop: 1 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Previous
        </Button>
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

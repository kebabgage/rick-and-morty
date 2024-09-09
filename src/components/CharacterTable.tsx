import { Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { CharacterOverview } from "./CharacterOverview";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableRowSkeleton } from "./TableRowSkeleton";

export const CharacterTable = () => {
  const [pageUrl, setPageUrl] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

  const pageNumber = useMemo(() => {
    if (pageUrl === undefined) {
      return 1;
    }

    return pageUrl.split("page=")[1];
  }, [pageUrl]);

  const { data, isPending, isError } = useCharacters(searchValue, pageUrl);

  if (isError) {
    return <Alert>Something went wrong!</Alert>;
  }

  return (
    <Box sx={{ width: "85%", paddingBottom: 2 }} data-testid="character-table">
      <Typography>
        Page {pageNumber} of {data?.info.pages}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          paddingBottom: 1,
          // height: "90vh",
        }}
      >
        <TextField
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // When search term is empty, reset the page variable
            if (event.target.value === "") {
              setPageUrl(undefined);
            }
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
        sx={{
          border: "1.5px solid rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
        }}
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

        {isPending ? (
          <TableRowSkeleton columnSizes={[2, 1, 1, 1, 2.75, 2.75, 1]} />
        ) : (
          data?.results?.map((character, index) => {
            return (
              <Box key={character.id}>
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
                  onClick={() => {
                    if (selectedCharacter === character.name) {
                      setSelectedCharacter(null);
                    } else {
                      setSelectedCharacter(character.name ?? "");
                    }
                  }}
                  selected={selectedCharacter === character.name}
                />
                <Divider key={index} />
                {selectedCharacter === character.name && (
                  <CharacterOverview character={character} />
                )}
              </Box>
            );
          })
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "right", paddingTop: 1 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          disabled={!data?.info?.prev}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!data?.info?.next}
          onClick={() =>
            data?.info?.next ? setPageUrl(data.info.next) : undefined
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

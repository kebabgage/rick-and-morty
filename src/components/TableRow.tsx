import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Character } from "../types/Character";
import { CharacterOverview } from "./CharacterOverview";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface TableRowProps {
  character: Character;
}

export const TableRow = ({ character }: TableRowProps) => {
  const [showOverview, setShowOverview] = useState(false);

  const onClick = () => {
    console.log("...");
    setShowOverview(!showOverview);
  };

  console.log(showOverview);

  return (
    <>
      <Box>
        <Grid container>
          <IconButton onClick={onClick}>
            {showOverview ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Grid size={4}>
            <Typography>{character?.name}</Typography>
          </Grid>
          <Grid size={1}>
            <Typography>{character?.gender}</Typography>
          </Grid>
          <Grid size={1}>
            <Typography>{character?.status}</Typography>
          </Grid>
          <Grid size={1}>
            <Typography>{character?.species}</Typography>
          </Grid>
          <Grid size={3}>
            <Typography>{character?.location?.name}</Typography>
          </Grid>
          <Grid size={2}>
            <Typography>{character?.episode?.length}</Typography>
          </Grid>
        </Grid>
      </Box>
      {showOverview && <CharacterOverview character={character} />}
    </>
  );
};

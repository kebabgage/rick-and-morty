import { Box } from "@mui/material";
import { Character } from "../types/Character";

interface CharacterOverviewProps {
  character: Character;
}

export const CharacterOverview = ({ character }: CharacterOverviewProps) => {
  return (
    <Box sx={{ height: "100px" }}>
      <img src={character.image} alt={`${character.name}-profile-image`} />
    </Box>
  );
};

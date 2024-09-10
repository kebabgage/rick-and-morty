import { Box } from "@mui/material";
import { Character } from "../types/Character";
import { AttributeValue } from "./AttributeValue";
import { EpisodeTable } from "./EpisodeTable";

interface CharacterOverviewProps {
  character: Character;
}

export const CharacterOverview = ({ character }: CharacterOverviewProps) => {
  return (
    <Box
      sx={{ display: "flex", padding: 2, gap: 3, alignContent: "center" }}
      data-testid="character-overview"
    >
      <img
        data-testid="character-profile-image"
        style={{
          height: "200px",
          width: "200px",
          // padding: "16px",
          borderRadius: "20px",
        }}
        src={character.image}
        alt={`${character.name}-profile-image`}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AttributeValue attribute="Name" value={character.name} />
        <AttributeValue attribute="Gender" value={character.gender} />
        <AttributeValue attribute="Status" value={character.status} />
        <AttributeValue attribute="Species" value={character.species} />
        <AttributeValue attribute="Origin" value={character.origin?.name} />
        <AttributeValue attribute="Location" value={character.location?.name} />
      </Box>
      <EpisodeTable episodes={character.episode} />
    </Box>
  );
};

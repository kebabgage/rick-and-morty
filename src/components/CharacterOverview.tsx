import { Box, Typography } from "@mui/material";
import { Character } from "../types/Character";
import { useQueries, useQuery } from "@tanstack/react-query";
import { EpisodeTable } from "./EpisodeTable";

interface AttributeValueProps {
  attribute: string;
  value?: string;
}
export const AttributeValue = ({ attribute, value }: AttributeValueProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", paddingBottom: 1 }}>
      <Typography sx={{ fontWeight: "bold", paddingRight: 1 }}>
        {attribute}
      </Typography>
      <Typography>{value ?? "-"}</Typography>
    </Box>
  );
};

interface CharacterOverviewProps {
  character: Character;
}

export const CharacterOverview = ({ character }: CharacterOverviewProps) => {
  return (
    <Box sx={{ display: "flex", padding: 2, gap: 3, alignContent: "center" }}>
      <img
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

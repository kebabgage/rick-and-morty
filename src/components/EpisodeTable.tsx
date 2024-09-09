import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import { TableRow } from "./TableRow";
import { Fragment, useState } from "react";
import { TableHeader } from "./TableHeader";

const getEpisodeAndSeasonNumber = (episodeCode: string) => {
  return episodeCode.replace("S", "").split("E");
};

interface EpisodeTableProps {
  episodes: string[];
}

export const EpisodeTable = ({ episodes }: EpisodeTableProps) => {
  // Used to toggle between showing all the episodes
  const [showAll, setShowAll] = useState(false);

  // Only fetch the first 10 episodes, unless the showAll toggle changes
  const filteredEpisodes = !showAll ? episodes.slice(0, 10) : episodes;

  const episodeQueryFn = async (episodeUrl: string) => {
    const res = await fetch(episodeUrl);
    return res.json();
  };

  const episodeQueries = useQueries({
    queries: filteredEpisodes.map((episode, i) => {
      return {
        queryKey: episode.split("/").slice(4, 6),
        queryFn: () => episodeQueryFn(episode),
      };
    }),
  });

  const isPending = episodeQueries.some((result) => result.isPending);
  const isError = episodeQueries.some((result) => result.isError);

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert>Error occurred!</Alert>;
  }

  return (
    <>
      <Box sx={{ width: "60%" }}>
        <Box
          sx={{
            border: "1.5px solid rgba(0, 0, 0, 0.25)",
            borderRadius: "4px",
          }}
        >
          <TableHeader
            columnValues={[
              { value: "Name", columnSize: 3 },
              { value: "Season", columnSize: 3 },
              { value: "Episode", columnSize: 3 },
            ]}
          />
          {episodeQueries.map((episode, index) => {
            const [seasonNumber, episodeNumber] = getEpisodeAndSeasonNumber(
              episode.data.episode
            );
            return (
              <Fragment key={index}>
                <Divider />
                <TableRow
                  index={episode.data.id}
                  columnValues={[
                    { value: episode.data.name, columnSize: 3 },
                    { value: seasonNumber, columnSize: 3 },
                    { value: episodeNumber, columnSize: 3 },
                  ]}
                />
              </Fragment>
            );
          })}
        </Box>
        {episodes.length > filteredEpisodes.length && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </Box>
    </>
  );
};

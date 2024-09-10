import { Alert, Box, Button, Divider } from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { getApi } from "../api/Api";
import { milliseconds } from "date-fns";
import { TableRowSkeleton } from "./TableRowSkeleton";

/**
 * Simple helper function to extract the numerical representation of
 * the season and episode
 *
 * @example
 * ```
 * > getEpisodeAndSeasonNumber("S01E23");
 * > returns [01, 23]
 * ```
 *
 * @param episodeCode - Text information about the season and episode
 * @returns An array with the first element being the season number,
 *          and the second being the episode number
 */
export const getEpisodeAndSeasonNumber = (episodeCode: string) => {
  return episodeCode.replace("S", "").split("E");
};

interface EpisodeTableProps {
  /**
   * Array of URLs to fetch episode data from.
   * Each URL is an individual episode to display data from.
   */
  episodes: string[];
}

export const EpisodeTable = ({ episodes }: EpisodeTableProps) => {
  const api = getApi();

  // Used to toggle between showing all the episodes
  const [showAll, setShowAll] = useState(false);

  // Only fetch the first 10 episodes, unless the showAll toggle changes
  const filteredEpisodes = !showAll ? episodes.slice(0, 10) : episodes;

  const episodeQueryFn = async (episodeUrl: string) => {
    return api.getEpisode(episodeUrl);
  };

  const episodeQueries = useQueries({
    queries: filteredEpisodes.map((episode, i) => {
      return {
        queryKey: episode.split("/").slice(4, 6),
        queryFn: () => episodeQueryFn(episode),
        retry: false,
        refetchInterval: milliseconds({ seconds: 5 }),
      };
    }),
  });

  const isPending = episodeQueries.some((result) => result.isPending);
  const isError = episodeQueries.some((result) => result.isError);

  if (isError) {
    return <Alert>Error occurred!</Alert>;
  }

  return (
    <>
      <Box
        sx={{ width: "60%", display: "flex", flexDirection: "column" }}
        data-testid="episode-table"
      >
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
          {isPending ? (
            <TableRowSkeleton skeletonNumber={10} columnSizes={[3, 3, 3]} />
          ) : (
            episodeQueries.map((episode, index) => {
              if (episode.data === undefined) {
                return null;
              }

              const [seasonNumber, episodeNumber] = getEpisodeAndSeasonNumber(
                episode.data?.episode
              );

              return (
                <Fragment key={index}>
                  <Divider />
                  <TableRow
                    columnValues={[
                      { value: episode.data.name, columnSize: 3 },
                      { value: seasonNumber, columnSize: 3 },
                      { value: episodeNumber, columnSize: 3 },
                    ]}
                  />
                </Fragment>
              );
            })
          )}
        </Box>

        {episodes.length >= 10 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAll(!showAll)}
            sx={{ alignSelf: "center", marginTop: 1 }}
            size="small"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </Box>
    </>
  );
};

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { episodeMocks } from "../api/mocks/episodeMocks";
import { EpisodeTable, getEpisodeAndSeasonNumber } from "./EpisodeTable";
import userEvent from "@testing-library/user-event";
const queryClient = new QueryClient();

const episodeUrls = episodeMocks.map((episode) => episode.url);

describe("EpisodeTable", () => {
  test("should fetch and display a row for each episode provided", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EpisodeTable episodes={episodeUrls} />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(
        screen.queryByTestId("cell-loading-skeleton")
      ).not.toBeInTheDocument()
    );

    // Check that the values we want are rendered
    for (const ep of episodeMocks.slice(0, 10)) {
      expect(screen.getByText(ep.name)).toBeInTheDocument();

      const [season, episode] = getEpisodeAndSeasonNumber(ep.episode);
      expect(screen.getByText(season)).toBeInTheDocument();
      expect(screen.getByText(episode)).toBeInTheDocument();
    }

    // Check that the show more button is visible
    expect(screen.getByText("Show More")).toBeInTheDocument();
  });

  test("should fetch more episodes when 'Show More' button is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EpisodeTable episodes={episodeUrls} />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(
        screen.queryByTestId("episode-table-loading")
      ).not.toBeInTheDocument()
    );

    // Check that the values we want are rendered
    for (const ep of episodeMocks.slice(0, 10)) {
      expect(screen.getByText(ep.name)).toBeInTheDocument();

      const [season, episode] = getEpisodeAndSeasonNumber(ep.episode);
      expect(screen.getByText(season)).toBeInTheDocument();
      expect(screen.getByText(episode)).toBeInTheDocument();
    }

    // Check that the show more button is visible
    expect(screen.getByText("Show More")).toBeInTheDocument();

    userEvent.click(screen.getByText("Show More"));

    await waitFor(() =>
      expect(
        screen.queryByTestId("episode-table-loading")
      ).not.toBeInTheDocument()
    );

    // Check that all the episode mocks are rendered
    for (const ep of episodeMocks) {
      expect(screen.getByText(ep.name)).toBeInTheDocument();

      const [season, episode] = getEpisodeAndSeasonNumber(ep.episode);
      expect(screen.getByText(season)).toBeInTheDocument();
      expect(screen.getByText(episode)).toBeInTheDocument();
    }
  });

  test("should display an error message when episode fetch fails", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EpisodeTable
          episodes={["https://episode.com/api/episode/wrong-name"]}
        />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Error occurred!")).toBeInTheDocument();
  });
});

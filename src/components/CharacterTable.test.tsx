import { act, render, screen, waitFor, within } from "@testing-library/react";
import { CharacterTable } from "./CharacterTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { characterMocks } from "../api/mocks/characterMocks";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient();

describe("CharacterTable", () => {
  test("should fetch and display a row for each character retrieved", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CharacterTable />
      </QueryClientProvider>
    );

    // The headings should be displayed
    for (const heading of [
      "Name",
      "Gender",
      "Status",
      "Species",
      "Location",
      "Origin",
      "Episodes",
    ]) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }

    await waitFor(() =>
      expect(
        screen.queryByTestId("cell-loading-skeleton")
      ).not.toBeInTheDocument()
    );

    // Check that each of the items from the mock are displayed
    const tableRows = screen.getAllByTestId("table-row");
    for (const [index, row] of tableRows.entries()) {
      const { name, gender, status, species, location, origin, episode } =
        characterMocks[index];

      // Check that the values are displayed
      expect(within(row).getByText(name)).toBeInTheDocument();
      expect(within(row).getByText(gender)).toBeInTheDocument();
      expect(within(row).getByText(status)).toBeInTheDocument();
      expect(within(row).getByText(species)).toBeInTheDocument();
      expect(within(row).getAllByText(location.name).length).toBeGreaterThan(0);
      expect(within(row).getAllByText(origin.name).length).toBeGreaterThan(0);
      expect(within(row).getByText(episode.length)).toBeInTheDocument();
    }
  });

  test("should be able to open character overview and close it", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CharacterTable />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(
        screen.queryByTestId("cell-loading-skeleton")
      ).not.toBeInTheDocument()
    );

    const tableRows = screen.getAllByTestId("table-row");
    expect(tableRows).toHaveLength(6);

    // Check that the second row is there
    userEvent.click(within(tableRows[1]).getByTestId("open-overview"));

    // The character overview should be visible
    expect(await screen.findByTestId("character-overview")).toBeInTheDocument();

    // The correct attributes should be visible
    expect(screen.getByTestId("name-value")).toHaveTextContent("Jillian");
    expect(screen.getByTestId("gender-value")).toHaveTextContent("Female");
    expect(screen.getByTestId("status-value")).toHaveTextContent("Alive");
    expect(screen.getByTestId("species-value")).toHaveTextContent("Bug");
    expect(screen.getByTestId("origin-value")).toHaveTextContent(
      "Jillianville"
    );
    expect(screen.getByTestId("location-value")).toHaveTextContent(
      "Jillianville"
    );

    // Check that the episode table is visible
    expect(screen.getByTestId("episode-table")).toBeInTheDocument();

    // Check that the image visible
    expect(screen.getByTestId("character-profile-image")).toBeInTheDocument();

    // Close the overview
    userEvent.click(within(tableRows[1]).getByTestId("open-overview"));

    await waitFor(() =>
      expect(screen.queryByTestId("character-overview")).not.toBeInTheDocument()
    );
  });
});

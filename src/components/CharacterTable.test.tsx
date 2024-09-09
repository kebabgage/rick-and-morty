import { render, screen } from "@testing-library/react";
import { CharacterTable } from "./CharacterTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("CharacterTable", () => {
  test("should fetch and display a row for each character retrieved", () => {
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
  });
});

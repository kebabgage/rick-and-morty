import { render, screen } from "@testing-library/react";
import { Character } from "../types/Character";
import { CharacterOverview } from "./CharacterOverview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const mockCharacter: Character = {
  id: "1",
  name: "James",
  gender: "Male",
  status: "Alive",
  species: "Animal",
  origin: {
    name: "London",
    location: "www.url.com/location/1",
  },
  location: {
    name: "Aarhus",
    location: "www.url.com/location/2",
  },
  episode: ["https://episode.com/api/episode/1"],
  image: "www.url.com/mock/image",
  created: "",
  type: "",
};

describe("CharacterOverview", () => {
  test("should render elements correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CharacterOverview character={mockCharacter} />
      </QueryClientProvider>
    );

    const img = screen.getByTestId("character-profile-image");
    expect(img).toHaveAttribute("src", mockCharacter.image);
    expect(img).toHaveAttribute("alt", `${mockCharacter.name}-profile-image`);

    // Check that the attributes are there
    expect(screen.getByTestId("name-attribute")).toHaveTextContent("Name");
    expect(screen.getByTestId("gender-attribute")).toHaveTextContent("Gender");
    expect(screen.getByTestId("status-attribute")).toHaveTextContent("Status");
    expect(screen.getByTestId("species-attribute")).toHaveTextContent(
      "Species"
    );
    expect(screen.getByTestId("origin-attribute")).toHaveTextContent("Origin");
    expect(screen.getByTestId("location-attribute")).toHaveTextContent(
      "Location"
    );

    // Check that the values are there
    expect(screen.getByTestId("name-value")).toHaveTextContent("James");
    expect(screen.getByTestId("gender-value")).toHaveTextContent("Male");
    expect(screen.getByTestId("status-value")).toHaveTextContent("Alive");
    expect(screen.getByTestId("species-value")).toHaveTextContent("Animal");
    expect(screen.getByTestId("origin-value")).toHaveTextContent("London");
    expect(screen.getByTestId("location-value")).toHaveTextContent("Aarhus");

    // Check that the episode table is there
    expect(screen.getByTestId("episode-table")).toBeInTheDocument();
  });
});

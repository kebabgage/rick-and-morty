import { episodeMocks } from "./mocks/episodeMocks";
import { Episode } from "../types/Episode";
import { Character } from "../types/Character";
import { characterMocks } from "./mocks/characterMocks";

export interface GetCharactersResponse {
  info: {
    // The total count of items
    count: number;

    // The previous page
    prev: string | null;

    // The next page
    next: string | null;

    // The total number of pages
    pages: number;
  };

  results: Character[];

  error?: string;
}

export class Api {
  /**
   * Simple check to see if we are running a unit test.
   *
   * Useful to avoid hitting the Live api in unit tests.
   */
  isTest() {
    if (process.env.NODE_ENV === "test") {
      return true;
    }

    return false;
  }

  async getEpisode(episodeUrl: string): Promise<Episode> {
    // Don't hit the real API in tests
    if (this.isTest()) {
      const episode = episodeMocks.find(
        (episode) => episode.url === episodeUrl
      );

      if (episode === undefined) {
        throw new Error("Episode not found!");
      }

      return Promise.resolve(episode);
    }

    // Fetch from the real API
    const response = await fetch(episodeUrl);
    return response.json() as unknown as Episode;
  }

  async getCharacters(charactersUrl: string): Promise<GetCharactersResponse> {
    // Don't hit the real API in tests
    if (this.isTest()) {
      return Promise.resolve({
        info: {
          count: 100,
          prev: null,
          next: "https://rickandmortyapi.com/api/episode?page=2",
          pages: 2,
        },
        results: characterMocks,
      });
    }

    // Fetch from the real API
    const response = await fetch(charactersUrl);
    return response.json() as unknown as GetCharactersResponse;
  }
}

export const getApi = () => {
  return new Api();
};

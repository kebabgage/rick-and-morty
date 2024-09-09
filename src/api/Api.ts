import { episodeMocks } from "./mocks/episodeMocks";
import { Episode } from "../types/Episode";

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
    // Avoid the real API if running via test
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
}

export const getApi = () => {
  return new Api();
};

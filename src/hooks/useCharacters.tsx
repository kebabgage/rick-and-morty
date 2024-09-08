import { useQuery } from "@tanstack/react-query";
import { Character } from "../types/Character";
import { useCallback, useMemo } from "react";

export interface ApiResponse {
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

export const useCharacters = (searchValue: string, currentPage?: string) => {
  const url = useMemo(() => {
    const baseUrl =
      currentPage !== undefined
        ? new URL(currentPage)
        : new URL("https://rickandmortyapi.com/api/character");

    const searchParams = new URLSearchParams(baseUrl.search);

    if (
      searchValue !== "" &&
      searchValue !== null &&
      searchParams.get("character") !== searchValue
    ) {
      searchParams.append("name", searchValue);
      baseUrl.search = searchParams.toString();
    }

    return baseUrl;
  }, [currentPage, searchValue]);

  /**
   *
   * @param page - The URL to fetch the data from
   * @returns
   */
  const queryFn = async () => {
    const result = await fetch(url.toString());
    return result.json() as unknown as ApiResponse;
  };

  return useQuery({
    queryFn: () => queryFn(),
    // TODO: Refactor this to be a getQueryKey
    queryKey: ["character", "page", url, "searchValue", searchValue],
  });
};

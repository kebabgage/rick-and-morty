import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getApi } from "../api/Api";

const getQueryKey = (url: URL) => {
  const searchParams = new URLSearchParams(url.search);

  let queryKey = ["character"];

  const pageQuery = searchParams.get("page");
  if (pageQuery !== null) {
    queryKey.push("page", pageQuery);
  }

  const searchQuery = searchParams.get("name");
  if (searchQuery !== null) {
    queryKey.push("name", searchQuery);
  }

  return queryKey;
};

export const useFetchCharacters = (
  searchValue: string,
  currentPage?: string
) => {
  const api = getApi();

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
    return api.getCharacters(url.toString());
  };

  return useQuery({
    queryFn: () => queryFn(),
    // TODO: Refactor this to be a getQueryKey
    queryKey: getQueryKey(url),
  });
};

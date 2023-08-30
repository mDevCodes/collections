import discogs from "../app/utils/discogs";
import React from "react";
import { useQuery } from "@tanstack/react-query";

type search = string;

export default function SearchResult(search: search) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["search-input", search],
    queryFn: () => discogs(search),
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <>
      <h1>{data.results[0].year}</h1>
    </>
  );
}

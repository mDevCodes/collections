import discogs from "../app/utils/discogs";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function SearchResult(props: { search: string }) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["search-input", props.search],
    queryFn: () => discogs(props.search),
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

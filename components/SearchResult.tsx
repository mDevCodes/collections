import discogs from "../app/utils/discogs";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function SearchResult({ search }: { search: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const params = new URLSearchParams({ search: "the strokes" });
      return fetch("/api/search?" + params).then((res) => res.json());
    },
  });

  console.log("data: ", data);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <div>
      <h1>{data.results[0].year}</h1>
    </div>
  );
}

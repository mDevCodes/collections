import { useQuery } from "@tanstack/react-query";
import Result from "./Result";
import { SearchResponseSchema } from "@/app/api/search/route";
import { Album } from "@/schemas/collections.schemas";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      const params = new URLSearchParams({ search: searchValue });
      const res = await fetch("/api/search?" + params);
      const data = await res.json();
      const parsedData = SearchResponseSchema.parse(data);

      return parsedData;
    },
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <div>
      {data.results.map((album: Album) => (
        <Result key={album.id} album={album} />
      ))}
    </div>
  );
}

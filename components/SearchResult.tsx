import { useQuery } from "@tanstack/react-query";
import { SearchResponseSchema } from "@/app/utils/discogs.schemas";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      const params = new URLSearchParams({ search: searchValue });
      const result = await fetch("/api/search?" + params).then((res) =>
        res.json()
      );
      const parsedResult = SearchResponseSchema.parse(result);
      return parsedResult;
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
      <h1>{data.results[0].year}</h1>
    </div>
  );
}

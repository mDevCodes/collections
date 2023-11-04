import { useQuery } from "@tanstack/react-query";
import Result from "./Result";
import { Album, SearchResponseSchema } from "@/schemas/collections.schemas";
import ResultLoading from "./ResultLoading";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: searchValue,
      });
      const res = await fetch("/api/search?" + params);
      const data = await res.json();
      const parsedData = SearchResponseSchema.parse(data);

      return parsedData;
    },
  });

  if (isLoading) {
    const loadingUiArray = Array(10).fill(null);
    return (
      <>
        {loadingUiArray.map((_, index) => (
          <ResultLoading key={index} />
        ))}
      </>
    );
  }

  if (isError) {
    return <h3>Error</h3>;
  }

  if (data?.results.length === 0) {
    return (
      <div className="flex justify-center">
        <p>No results found</p>
      </div>
    );
  }

  return (
    <>
      {data?.results.map((album: Album) => (
        <Result key={album.id} album={album} />
      ))}
    </>
  );
}

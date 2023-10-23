import { useQuery } from "@tanstack/react-query";
import Result from "./Result";
import { Album, SearchResponseSchema } from "@/schemas/collections.schemas";
import Icon from "./Icon";
import ResultLoadingUi from "./ResultLoadingUi";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, isError, isLoading, isSuccess } = useQuery({
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
          <ResultLoadingUi key={index} />
        ))}
      </>
    );
  }

  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <>
      {data?.results.map((album: Album) => (
        <Result key={album.id} album={album} />
      ))}
    </>
  );
}

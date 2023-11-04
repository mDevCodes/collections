import { useInfiniteQuery } from "@tanstack/react-query";
import Result from "./Result";
import { Album, SearchResponseSchema } from "@/schemas/collections.schemas";
import ResultLoading from "./ResultLoading";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", searchValue],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        search: searchValue ? searchValue : "flume",
        page: String(pageParam),
      });

      const res = await fetch("/api/search?" + params);
      const data = await res.json();
      const parsedData = SearchResponseSchema.parse(data);
      return parsedData;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1;
    },
  });

  if (isFetching) {
    const loadingUiArray = Array(10).fill(null);
    return (
      <>
        {loadingUiArray.map((_, index) => (
          <ResultLoading key={index} />
        ))}
      </>
    );
  }

  if (error) {
    return <h3>Error</h3>;
  }

  if (data?.pages.length === 0) {
    return (
      <div className="flex justify-center">
        <p>No results found</p>
      </div>
    );
  }

  return (
    <>
      {data?.pages.map((page) => (
        <>
          {page.results.map((album: Album) => (
            <Result key={album.id} album={album} />
          ))}
        </>
      ))}
      <button
        className="border-2 border-gray-800 rounded-xl p-3 mb-4"
        onClick={() => fetchNextPage()}
      >
        More Results
      </button>
    </>
  );
}

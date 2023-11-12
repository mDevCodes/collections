import { useInfiniteQuery } from "@tanstack/react-query";
import Result from "./Result";
import { Album, SearchResponseSchema } from "@/schemas/collections.schemas";
import ResultLoading from "./ResultLoading";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["search", searchValue],
      queryFn: async ({ pageParam }) => {
        const params = new URLSearchParams({
          search: searchValue,
          page: String(pageParam),
        });
        const res = await fetch("/api/search?" + params);
        const data = await res.json();
        const parsedData = SearchResponseSchema.parse(data);
        return parsedData;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLastPage) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    });

  if (error) {
    return <h3>Error</h3>;
  }

  return (
    <>
      {data?.pages[0].data.length !== 0 ? (
        data?.pages.map((page) =>
          page.data.map((album: Album) => (
            <Result key={album.id} album={album} />
          ))
        )
      ) : (
        <div className="flex justify-center">
          <p>No results found</p>
        </div>
      )}
      {isFetching
        ? Array(10)
            .fill(null)
            .map((_, index) => <ResultLoading key={index} />)
        : null}
      {!isFetching && hasNextPage ? (
        <button
          className="border-2 border-gray-800 rounded-xl p-3 mb-4"
          onClick={() => fetchNextPage()}
        >
          More Results
        </button>
      ) : null}
    </>
  );
}

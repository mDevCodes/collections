import { useInfiniteQuery } from "@tanstack/react-query";
import Result from "./Result";
import { Album, SearchResponseSchema } from "@/schemas/collections.schemas";
import ResultLoading from "./ResultLoading";
import useUser from "@/lib/supabase/useUser";
import {
  useCollectionItems,
  useToggleCollectionItem,
} from "@/lib/hooks/useCollectionItems";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { user } = useUser();
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
        if (!res.ok) {
          throw new Error(
            typeof data?.error === "string" ? data.error : "Search failed"
          );
        }
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
      retry: false,
    });

  const { data: collectionItems } = useCollectionItems("collection");
  const { data: wishlistItems } = useCollectionItems("wishlist");
  const { add: addToCollection, remove: removeFromCollection } =
    useToggleCollectionItem("collection");
  const { add: addToWishlist, remove: removeFromWishlist } =
    useToggleCollectionItem("wishlist");

  const collectionIds = new Set(collectionItems?.map((item) => item.discogsId));
  const wishlistIds = new Set(wishlistItems?.map((item) => item.discogsId));

  if (error) {
    return <h3>{error.message || "Something went wrong. Please try again."}</h3>;
  }

  return (
    <>
      {data?.pages[0].data.length !== 0 ? (
        data?.pages.map((page) =>
          page.data.map((album: Album) => (
            <Result
              key={album.id}
              album={album}
              isSignedIn={!!user}
              isInCollection={collectionIds.has(album.id)}
              isInWishlist={wishlistIds.has(album.id)}
              onToggleCollection={() =>
                collectionIds.has(album.id)
                  ? removeFromCollection.mutate(album.id)
                  : addToCollection.mutate(album)
              }
              onToggleWishlist={() =>
                wishlistIds.has(album.id)
                  ? removeFromWishlist.mutate(album.id)
                  : addToWishlist.mutate(album)
              }
            />
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

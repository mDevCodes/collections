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
  const query = searchValue.trim();

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
      enabled: query !== "",
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

  if (query === "") {
    return (
      <div className="px-5 py-[60px] text-center text-muted">
        <p className="mb-[6px] text-[16px]">
          Start typing to search millions of records.
        </p>
        <p className="text-[14px]">
          Try &ldquo;Miles Davis&rdquo;, &ldquo;Rumours&rdquo;, or &ldquo;Daft
          Punk&rdquo;.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <h3 className="px-5 py-[60px] text-center text-text">
        {error.message || "Something went wrong. Please try again."}
      </h3>
    );
  }

  const hasResults = (data?.pages[0]?.data.length ?? 0) > 0;

  if (!isFetching && !hasResults) {
    return (
      <div className="px-5 py-[60px] text-center text-muted">
        <p className="text-[16px]">No results found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data?.pages.map((page) =>
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
      )}
      {isFetching
        ? Array(10)
            .fill(null)
            .map((_, index) => <ResultLoading key={index} />)
        : null}
      {!isFetching && hasNextPage ? (
        <button
          className="mb-4 mt-6 self-center rounded-full border border-pill-border px-6 py-[11px] font-display text-[14px] font-semibold text-text"
          onClick={() => fetchNextPage()}
        >
          More Results
        </button>
      ) : null}
    </div>
  );
}

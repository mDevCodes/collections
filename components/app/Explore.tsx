"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useDebounce } from "react-use";
import Icon from "@/components/Icon";
import Cover from "@/components/Cover";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import useProfile from "@/lib/supabase/useProfile";
import {
  useCollectionItems,
  useToggleCollectionItem,
} from "@/lib/hooks/useCollectionItems";
import { useDiscover } from "@/lib/hooks/useDiscover";
import { Album, CollectionItem } from "@/schemas/collections.schemas";

const DEFAULT_BROWSE_GENRES = ["Rock", "Jazz", "Electronic", "Hip-Hop", "Soul", "Funk"];
const DEFAULT_BROWSE_DECADES = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s"];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function topGenresOf(items: CollectionItem[], max: number) {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    if (item.genre) counts.set(item.genre, (counts.get(item.genre) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([genre]) => genre);
}

function AlbumMiniCard({
  album,
  inCollection,
  onToggleCollection,
  inWishlist,
  onToggleWishlist,
  isNew,
}: {
  album: Album;
  inCollection: boolean;
  onToggleCollection: () => void;
  inWishlist: boolean;
  onToggleWishlist: () => void;
  isNew?: boolean;
}) {
  return (
    <div>
      <div className="relative mb-[10px] aspect-square overflow-hidden rounded-[7px] shadow-cover">
        <Cover
          src={album.coverImage}
          alt={`${album.albumTitle} cover image`}
          className="absolute inset-0"
        />
        {isNew ? (
          <span className="absolute left-[10px] top-[10px] rounded-full bg-accent px-[7px] py-[3px] font-body text-[9px] font-semibold uppercase tracking-[0.08em] text-accent-text">
            New
          </span>
        ) : null}
        <div className="absolute right-[10px] top-[10px] flex flex-col gap-[7px]">
          <button
            onClick={onToggleCollection}
            title={inCollection ? "In Collection" : "Add to collection"}
            className="flex h-[29px] w-[29px] items-center justify-center rounded-full bg-status-bg text-accent backdrop-blur-[6px]"
          >
            <Icon type={inCollection ? "check" : "plus"} size="xsmall" />
          </button>
          <button
            onClick={onToggleWishlist}
            title={inWishlist ? "In Wishlist" : "Add to wishlist"}
            className="flex h-[29px] w-[29px] items-center justify-center rounded-full bg-status-bg text-accent backdrop-blur-[6px]"
          >
            <Icon type={inWishlist ? "heart-filled" : "heart"} size="xsmall" />
          </button>
        </div>
      </div>
      <p className="mb-px font-display text-[13px] font-semibold leading-[1.2] text-text">
        {album.albumTitle}
      </p>
      <p className="text-[12px] text-muted">{album.artist}</p>
    </div>
  );
}

export default function Explore() {
  const { profile } = useProfile();
  const { data: collection } = useCollectionItems("collection");
  const { data: wishlist } = useCollectionItems("wishlist");
  const { add: addToCollection, remove: removeFromCollection } =
    useToggleCollectionItem("collection");
  const { add: addToWishlist, remove: removeFromWishlist } =
    useToggleCollectionItem("wishlist");

  const owned = useMemo(() => collection ?? [], [collection]);
  const ownedIds = useMemo(() => new Set(owned.map((a) => a.discogsId)), [owned]);
  const wishlistIds = useMemo(
    () => new Set((wishlist ?? []).map((a) => a.discogsId)),
    [wishlist]
  );

  const ownedTopGenres = useMemo(() => topGenresOf(owned, 2), [owned]);

  // "Recommended for you" should only change on a fresh page load, not every
  // time an item is added/removed -- otherwise the section visibly reshuffles
  // right after someone clicks the collection/wishlist icon. Snapshot the
  // genre signal once the collection query first settles and keep using that
  // snapshot for the rest of the page's lifetime; the icons themselves stay
  // reactive since they read `ownedIds`/`wishlistIds` directly.
  const frozenOwnedGenresRef = useRef<string[] | null>(null);
  if (frozenOwnedGenresRef.current === null && collection !== undefined) {
    frozenOwnedGenresRef.current = ownedTopGenres;
  }
  const frozenOwnedGenres = frozenOwnedGenresRef.current ?? [];
  const genresForQuery = frozenOwnedGenres.length
    ? frozenOwnedGenres
    : profile?.genres?.slice(0, 2) ?? [];

  const { data } = useDiscover(genresForQuery);

  const recommended = data?.recommended ?? [];
  const trending = data?.trending ?? [];
  const newItems = data?.newItems ?? [];

  const recommendedSub = frozenOwnedGenres.length
    ? `Based on the ${frozenOwnedGenres.join(" & ")} in your collection.`
    : (profile?.genres?.length ?? 0) > 0
      ? "Based on the genres you picked when you joined."
      : null;

  const genreCounts = useMemo(() => {
    const counts = new Map<string, number>();
    owned.forEach((item) => {
      if (item.genre) counts.set(item.genre, (counts.get(item.genre) ?? 0) + 1);
    });
    return counts;
  }, [owned]);

  const browseGenres = genreCounts.size
    ? Array.from(genreCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }))
    : DEFAULT_BROWSE_GENRES.map((name) => ({ name, count: null as number | null }));

  const browseDecades = useMemo(() => {
    const decades = new Set<string>();
    owned.forEach((item) => {
      const year = Number(item.year);
      if (!Number.isNaN(year)) decades.add(`${Math.floor(year / 10) * 10}s`);
    });
    const list = Array.from(decades).sort();
    return list.length ? list : DEFAULT_BROWSE_DECADES;
  }, [owned]);

  const recentItems = owned.slice(0, 6);

  const toggleCollection = (album: Album) => {
    if (ownedIds.has(album.id)) {
      removeFromCollection.mutate(album.id);
    } else {
      addToCollection.mutate(album);
    }
  };

  const toggleWishlist = (album: Album) => {
    if (wishlistIds.has(album.id)) {
      removeFromWishlist.mutate(album.id);
    } else {
      addToWishlist.mutate(album);
    }
  };

  const [clientSearch, setClientSearch] = useState("");
  const [serverSearch, setServerSearch] = useState("");
  useDebounce(() => setServerSearch(clientSearch), 700, [clientSearch]);
  const isSearching = serverSearch.trim() !== "";

  return (
    <main className="mx-auto max-w-[1160px] px-[18px] pb-24 pt-6 dt:px-8 dt:pb-20 dt:pt-10">
      <p className="mb-[6px] text-[15px] text-muted">
        {greeting()}, {profile?.displayName ?? profile?.username ?? "there"}
      </p>
      <h1 className="mb-2 font-display text-[clamp(30px,5.5vw,42px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-text">
        Explore
      </h1>
      <p className="mb-[26px] text-[15px] text-muted">
        Fresh picks, this week&apos;s trending records, and gems for your shelf.
      </p>

      <SearchBar
        searchValue={clientSearch}
        onSearch={(value) => {
          setClientSearch(value);
          if (value === "") setServerSearch("");
        }}
        onClear={() => {
          setClientSearch("");
          setServerSearch("");
        }}
      />

      {isSearching ? (
        <SearchResult searchValue={serverSearch} />
      ) : (
        <>
          {recommended.length > 0 ? (
            <div className="mb-12">
              <h2 className="mb-1 font-display text-[21px] font-bold tracking-[-0.02em] text-text">
                Recommended for you
              </h2>
              {recommendedSub ? (
                <p className="mb-[18px] text-[13px] text-muted">{recommendedSub}</p>
              ) : null}
              <div className="grid grid-cols-2 gap-[14px_18px] dt:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] dt:gap-5">
                {recommended.map((album) => (
                  <AlbumMiniCard
                    key={album.id}
                    album={album}
                    inCollection={ownedIds.has(album.id)}
                    onToggleCollection={() => toggleCollection(album)}
                    inWishlist={wishlistIds.has(album.id)}
                    onToggleWishlist={() => toggleWishlist(album)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {trending.length > 0 ? (
            <div className="mb-12">
              <h2 className="mb-[18px] font-display text-[21px] font-bold tracking-[-0.02em] text-text">
                Trending now
              </h2>
              <div className="grid grid-cols-2 gap-[14px_18px] dt:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] dt:gap-5">
                {trending.map((album) => (
                  <AlbumMiniCard
                    key={album.id}
                    album={album}
                    inCollection={ownedIds.has(album.id)}
                    onToggleCollection={() => toggleCollection(album)}
                    inWishlist={wishlistIds.has(album.id)}
                    onToggleWishlist={() => toggleWishlist(album)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {newItems.length > 0 ? (
            <div className="mb-12">
              <h2 className="mb-[18px] font-display text-[21px] font-bold tracking-[-0.02em] text-text">
                New this week
              </h2>
              <div className="grid grid-cols-2 gap-[14px_18px] dt:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] dt:gap-5">
                {newItems.map((album) => (
                  <AlbumMiniCard
                    key={album.id}
                    album={album}
                    inCollection={ownedIds.has(album.id)}
                    onToggleCollection={() => toggleCollection(album)}
                    inWishlist={wishlistIds.has(album.id)}
                    onToggleWishlist={() => toggleWishlist(album)}
                    isNew
                  />
                ))}
              </div>
            </div>
          ) : null}

          <h2 className="mb-[18px] font-display text-[21px] font-bold tracking-[-0.02em] text-text">
            Browse by genre
          </h2>
          <div className="mb-6 flex flex-wrap gap-[10px]">
            {browseGenres.map((g) => (
              <Link
                key={g.name}
                href={`/search?q=${encodeURIComponent(g.name)}`}
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-[18px] py-[11px] font-display text-[14px] font-semibold text-text"
              >
                {g.name}
                {g.count !== null ? (
                  <span className="font-body text-[13px] font-medium text-muted">{g.count}</span>
                ) : null}
              </Link>
            ))}
          </div>

          <h2 className="mb-[18px] font-display text-[21px] font-bold tracking-[-0.02em] text-text">
            Browse by decade
          </h2>
          <div className="mb-12 flex flex-wrap gap-[10px]">
            {browseDecades.map((decade) => (
              <Link
                key={decade}
                href={`/search?q=${encodeURIComponent(decade.slice(0, 3))}`}
                className="rounded-xl border border-border bg-surface px-[18px] py-[11px] font-display text-[14px] font-semibold text-text"
              >
                {decade}
              </Link>
            ))}
          </div>

          {recentItems.length > 0 ? (
            <div>
              <div className="mb-[18px] flex items-baseline justify-between">
                <h2 className="font-display text-[21px] font-bold tracking-[-0.02em] text-text">
                  Recently added to your shelf
                </h2>
                <Link href="/library" className="font-display text-[14px] font-semibold text-accent">
                  View library →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-[14px_18px] dt:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] dt:gap-5">
                {recentItems.map((item) => (
                  <Link key={item.id} href="/library">
                    <Cover
                      src={item.coverImage}
                      alt={`${item.albumTitle} cover image`}
                      className="relative mb-[10px] aspect-square overflow-hidden rounded-[7px] shadow-cover"
                    />
                    <p className="mb-px font-display text-[13px] font-semibold leading-[1.2] text-text">
                      {item.albumTitle}
                    </p>
                    <p className="text-[12px] text-muted">{item.artist}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </main>
  );
}

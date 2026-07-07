"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Icon from "./Icon";
import Cover from "./Cover";
import useUser from "@/lib/supabase/useUser";
import {
  useCollectionItems,
  useToggleCollectionItem,
} from "@/lib/hooks/useCollectionItems";
import { CollectionItem, ListType } from "@/schemas/collections.schemas";

type View = "grid" | "list";
type Sort = "recent" | "artist" | "year";

function TabButton({
  active,
  onClick,
  icon,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: "grid" | "heart";
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 rounded-[8px] px-4 py-[9px] font-display text-[13px]",
        active
          ? "bg-toggle-active font-semibold text-text shadow-toggle-active"
          : "bg-transparent font-medium text-muted"
      )}
    >
      <Icon type={icon} size="xsmall" />
      {children}
      <span
        className={clsx(
          "rounded-full px-[7px] py-px text-[11px]",
          active ? "bg-bg text-muted" : "bg-toggle-bg text-muted"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function ViewSegmentButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: "grid" | "list";
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-[6px] rounded-[7px] px-[13px] py-[7px] font-display text-[13px]",
        active
          ? "bg-toggle-active font-semibold text-text shadow-toggle-active"
          : "bg-transparent font-medium text-muted"
      )}
    >
      <Icon type={icon} size="xsmall" />
      {children}
    </button>
  );
}

export default function Library() {
  const { user, isLoading: isUserLoading } = useUser();
  const [libTab, setLibTab] = useState<ListType>("collection");
  const { data: collectionData, isLoading: isCollectionLoading } =
    useCollectionItems("collection");
  const { data: wishlistData, isLoading: isWishlistLoading } =
    useCollectionItems("wishlist");
  const { remove } = useToggleCollectionItem(libTab);

  const [view, setView] = useState<View>("grid");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<Sort>("recent");

  const collectionCount = collectionData?.length ?? 0;
  const wishlistCount = wishlistData?.length ?? 0;

  const allItems = useMemo(
    () => (libTab === "collection" ? collectionData : wishlistData) ?? [],
    [libTab, collectionData, wishlistData]
  );

  const switchTab = (tab: ListType) => {
    setLibTab(tab);
    setGenre("All");
  };

  const genres = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(allItems.map((a) => a.genre).filter((g): g is string => Boolean(g)))
      ),
    ],
    [allItems]
  );

  const items = useMemo(() => {
    let list = genre === "All" ? allItems : allItems.filter((a) => a.genre === genre);
    list = [...list];
    if (sort === "artist") {
      list.sort((x, y) => x.artist.localeCompare(y.artist));
    } else if (sort === "year") {
      list.sort((x, y) => Number(y.year ?? 0) - Number(x.year ?? 0));
    }
    return list;
  }, [allItems, genre, sort]);

  const years = items.map((a) => Number(a.year)).filter((y) => !Number.isNaN(y));
  const genreCount = new Set(items.map((a) => a.genre).filter(Boolean)).size;
  const stats = items.length
    ? `${items.length} record${items.length !== 1 ? "s" : ""} · ${genreCount} genre${
        genreCount !== 1 ? "s" : ""
      } · ${Math.min(...years)}–${Math.max(...years)}`
    : "No records yet";

  const isLoading = isCollectionLoading || isWishlistLoading;

  if (isUserLoading || isLoading) {
    return null;
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-[1160px] px-[18px] pt-6 dt:px-8 dt:pt-10">
        <p className="text-[15px] text-text">
          <Link href="/login" className="font-semibold text-accent underline">
            Sign in
          </Link>{" "}
          to see your library.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1160px] px-[18px] pb-24 pt-6 dt:px-8 dt:pb-20 dt:pt-10">
      <h1 className="mb-2 font-display text-[clamp(30px,5.5vw,42px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-text">
        Library
      </h1>
      <p className="mb-[22px] text-[15px] text-muted">
        Everything you own and everything you want, in one place.
      </p>

      <div className="mb-[26px] inline-flex gap-[6px] rounded-[12px] border border-border bg-toggle-bg p-[5px]">
        <TabButton
          active={libTab === "collection"}
          onClick={() => switchTab("collection")}
          icon="grid"
          count={collectionCount}
        >
          Collection
        </TabButton>
        <TabButton
          active={libTab === "wishlist"}
          onClick={() => switchTab("wishlist")}
          icon="heart"
          count={wishlistCount}
        >
          Wishlist
        </TabButton>
      </div>

      <div className="mb-[22px] flex flex-wrap items-center justify-between gap-4">
        <p className="text-[14px] text-muted">{stats}</p>
        <div className="flex gap-[6px] rounded-[11px] border border-border bg-toggle-bg p-1">
          <ViewSegmentButton active={view === "grid"} onClick={() => setView("grid")} icon="grid">
            Grid
          </ViewSegmentButton>
          <ViewSegmentButton active={view === "list"} onClick={() => setView("list")} icon="list">
            List
          </ViewSegmentButton>
        </div>
      </div>

      {allItems.length === 0 ? (
        <div className="mt-[10px] rounded-2xl border-[1.5px] border-dashed border-pill-border py-[70px] text-center">
          <div className="mx-auto mb-[18px] flex h-14 w-14 items-center justify-center rounded-full bg-toggle-bg text-muted">
            <Icon type="disc" size="medium" />
          </div>
          <p className="mb-[6px] font-display text-[18px] font-semibold text-text">
            {libTab === "collection"
              ? "Your collection is empty"
              : "Your wishlist is empty"}
          </p>
          <p className="mb-[22px] text-[14px] text-muted">
            {libTab === "collection"
              ? "Records you own will show up here."
              : "Save records you want for later."}
          </p>
          <Link
            href="/search"
            className="rounded-full bg-accent px-[22px] py-[11px] font-display text-[14px] font-semibold text-accent-text"
          >
            Search for records
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-[30px] flex flex-wrap items-center justify-between gap-[14px]">
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={clsx(
                    "rounded-full px-[15px] py-2 font-display text-[13px]",
                    g === genre
                      ? "border border-accent bg-accent font-semibold text-accent-text"
                      : "border border-pill-border bg-transparent font-medium text-muted"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-[9px] text-[13px] text-muted">
              Sort
              <div className="relative inline-flex items-center">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="appearance-none rounded-full border border-pill-border bg-transparent py-2 pl-4 pr-9 font-display text-[13px] font-medium text-text outline-none"
                >
                  <option value="recent">Recently added</option>
                  <option value="artist">Artist A–Z</option>
                  <option value="year">Year — newest</option>
                </select>
                <span className="pointer-events-none absolute right-[15px] text-[10px] text-muted">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <p className="text-[14px] text-muted">No records match this filter.</p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 gap-[22px_14px] dt:grid-cols-[repeat(auto-fill,minmax(190px,1fr))] dt:gap-[28px_24px]">
              {items.map((item) => (
                <GridCard
                  key={item.id}
                  item={item}
                  onRemove={() => remove.mutate(item.discogsId)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {items.map((item) => (
                <ListRow
                  key={item.id}
                  item={item}
                  onRemove={() => remove.mutate(item.discogsId)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

function GridCard({
  item,
  onRemove,
}: {
  item: CollectionItem;
  onRemove: () => void;
}) {
  return (
    <div>
      <div className="relative mb-[13px] aspect-square overflow-hidden rounded-[8px] shadow-cover">
        <Cover
          src={item.coverImage}
          alt={`${item.albumTitle} cover image`}
          className="absolute inset-0"
        />
        <button
          onClick={onRemove}
          title="Remove"
          className="absolute right-[10px] top-[10px] flex h-[29px] w-[29px] items-center justify-center rounded-full bg-status-bg text-muted backdrop-blur-[6px]"
        >
          <Icon type="trash" size="xsmall" />
        </button>
      </div>
      <p className="mb-[3px] font-display text-[15px] font-semibold leading-[1.25] tracking-[-0.01em] text-text">
        {item.albumTitle}
      </p>
      <p className="mb-2 text-[14px] text-muted">{item.artist}</p>
      <div className="flex items-center gap-2 text-[12px]">
        <span className="text-muted-2">{item.year ?? "—"}</span>
        {item.genre ? (
          <>
            <span className="text-faint">·</span>
            <span className="text-muted-2">{item.genre}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ListRow({
  item,
  onRemove,
}: {
  item: CollectionItem;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-divider py-[14px]">
      <Cover
        src={item.coverImage}
        alt={`${item.albumTitle} cover image`}
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[5px]"
      />
      <div className="min-w-0 flex-grow">
        <p className="mb-[2px] truncate font-display text-[15px] font-semibold tracking-[-0.01em] text-text">
          {item.albumTitle}
        </p>
        <p className="text-[13px] text-muted">
          {item.artist} · {item.year ?? "—"}
          {item.genre ? ` · ${item.genre}` : ""}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 rounded-full border border-pill-border px-4 py-2 font-display text-[13px] font-semibold text-muted"
      >
        Remove
      </button>
    </div>
  );
}

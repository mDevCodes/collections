"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUser from "@/lib/supabase/useUser";
import useProfile from "@/lib/supabase/useProfile";
import {
  useCollectionItems,
  useToggleCollectionItem,
} from "@/lib/hooks/useCollectionItems";
import Icon from "@/components/Icon";
import Cover from "@/components/Cover";
import { CollectionItem } from "@/schemas/collections.schemas";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function MiniCard({
  item,
  href,
  action,
}: {
  item: CollectionItem;
  href: string;
  action?: React.ReactNode;
}) {
  return (
    <div>
      <Link href={href}>
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
      {action}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { profile } = useProfile();
  const { data: collection } = useCollectionItems("collection");
  const { data: wishlist } = useCollectionItems("wishlist");
  const { add: addToCollection } = useToggleCollectionItem("collection");

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace("/search");
    }
  }, [isUserLoading, user, router]);

  const owned = useMemo(() => collection ?? [], [collection]);
  const wished = useMemo(() => wishlist ?? [], [wishlist]);

  const genreCount = useMemo(
    () => new Set(owned.map((a) => a.genre).filter(Boolean)).size,
    [owned]
  );
  const years = useMemo(
    () => owned.map((a) => Number(a.year)).filter((y) => !Number.isNaN(y)),
    [owned]
  );
  const yearSpan = years.length
    ? `${Math.min(...years)}–${Math.max(...years)}`
    : "—";
  const recentItems = owned.slice(0, 6);
  const wishPreview = wished.slice(0, 4);

  const stats = [
    { value: owned.length, label: "Records owned", href: "/collection" },
    { value: wished.length, label: "On wishlist", href: "/wishlist" },
    { value: genreCount, label: "Genres", href: "/collection" },
    { value: yearSpan, label: "Years spanned", href: "/collection" },
  ];

  if (isUserLoading || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-[1160px] px-[18px] pb-24 pt-6 dt:px-8 dt:pb-20 dt:pt-10">
      <p className="mb-[6px] text-[15px] text-muted">{greeting()}</p>
      <h1 className="mb-2 font-display text-[clamp(30px,5.5vw,42px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-text">
        Welcome back, {profile?.username ?? "there"}
      </h1>
      <p className="mb-[30px] mt-[6px] text-[15px] text-muted">
        You own {owned.length} record{owned.length !== 1 ? "s" : ""} across{" "}
        {genreCount} genre{genreCount !== 1 ? "s" : ""}.
      </p>

      <Link
        href="/search"
        className="mb-[38px] flex items-center gap-3 rounded-full border border-field-border bg-field px-[22px] py-[15px] text-[16px] text-muted"
      >
        <Icon type="search" size="small" />
        Search for records to add…
      </Link>

      <div className="mb-[46px] grid grid-cols-2 gap-3 dt:grid-cols-4 dt:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-[14px] border border-border bg-surface px-[22px] py-5"
          >
            <p className="mb-[6px] font-display text-[30px] font-extrabold leading-none tracking-[-0.02em] text-text">
              {stat.value}
            </p>
            <p className="text-[13px] text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mb-[18px] flex items-baseline justify-between">
        <h2 className="font-display text-[21px] font-bold tracking-[-0.02em] text-text">
          Recently added
        </h2>
        <Link
          href="/collection"
          className="font-display text-[14px] font-semibold text-accent"
        >
          View all →
        </Link>
      </div>
      {recentItems.length > 0 ? (
        <div className="mb-[46px] grid grid-cols-2 gap-[14px] dt:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] dt:gap-5">
          {recentItems.map((item) => (
            <MiniCard key={item.id} item={item} href="/collection" />
          ))}
        </div>
      ) : (
        <p className="mb-[46px] text-[14px] text-muted">
          Nothing here yet — search for a record to add one.
        </p>
      )}

      {wishPreview.length > 0 ? (
        <>
          <div className="mb-[18px] flex items-baseline justify-between">
            <h2 className="font-display text-[21px] font-bold tracking-[-0.02em] text-text">
              From your wishlist
            </h2>
            <Link
              href="/wishlist"
              className="font-display text-[14px] font-semibold text-accent"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-[14px] dt:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] dt:gap-5">
            {wishPreview.map((item) => (
              <MiniCard
                key={item.id}
                item={item}
                href="/wishlist"
                action={
                  <button
                    onClick={() =>
                      addToCollection.mutate({
                        id: item.discogsId,
                        albumTitle: item.albumTitle,
                        artist: item.artist,
                        coverImage: item.coverImage ?? "",
                        year: item.year ?? undefined,
                        genre: item.genre ?? undefined,
                      })
                    }
                    className="mt-2 flex items-center gap-[5px] font-display text-[12px] font-semibold text-accent"
                  >
                    <Icon type="plus" size="xsmall" />
                    Add to Collection
                  </button>
                }
              />
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}

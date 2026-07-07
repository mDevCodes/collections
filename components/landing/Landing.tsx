"use client";

import Link from "next/link";
import Cover from "@/components/Cover";
import { useDiscover } from "@/lib/hooks/useDiscover";
import formatCollectors from "@/utils/formatCollectors";
import { Album } from "@/schemas/collections.schemas";

const STEPS = [
  {
    n: "1",
    title: "Search",
    body: "Find any pressing from a catalogue of millions — by title, artist, genre or year.",
  },
  {
    n: "2",
    title: "Collect",
    body: "Mark what you own and build a wishlist of the records you still want.",
  },
  {
    n: "3",
    title: "Share",
    body: "Send your shelf to friends and fellow Collectors with a single link.",
  },
];

// The seamless marquee loop (`translateX(-50%)`, see the `marquee` keyframes
// in styles/globals.css) only looks gapless if a single un-doubled set of
// covers is already wider than the viewport. The "popular" pool the API
// returns can come back short (deduped iconic-album lookups often resolve
// to fewer than 24 unique records), so cycle the available items up to a
// generous minimum count before doubling -- regardless of how few (or many)
// items the API handed back, the row always has enough width to loop
// without a visible gap.
const MIN_MARQUEE_ITEMS = 24;

function fillMarqueeRow(items: Album[], minCount: number) {
  if (items.length === 0) return items;
  const filled: Album[] = [];
  while (filled.length < minCount) {
    filled.push(...items);
  }
  return filled;
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: Album[];
  reverse?: boolean;
}) {
  const filled = fillMarqueeRow(items, MIN_MARQUEE_ITEMS);
  const doubled = [...filled, ...filled];
  return (
    <div
      className="mb-4 flex w-max gap-4 last:mb-0"
      style={{
        animation: `${reverse ? "marquee-rev" : "marquee"} ${
          reverse ? 84 : 72
        }s linear infinite`,
      }}
    >
      {doubled.map((item, i) => (
        <Cover
          key={`${item.id}-${i}`}
          src={item.coverImage}
          alt={`${item.albumTitle} cover image`}
          className="relative aspect-square w-[132px] shrink-0 overflow-hidden rounded-[7px] shadow-cover"
        />
      ))}
    </div>
  );
}

export default function Landing() {
  const { data } = useDiscover();
  const popularPool = data?.popular ?? [];
  const marqueeRow1 = popularPool.slice(0, 12);
  const marqueeRow2Raw = popularPool.slice(12, 24);
  const marqueeRow2 = marqueeRow2Raw.length > 0 ? marqueeRow2Raw : [...marqueeRow1].reverse();
  const charts = data?.charts ?? [];

  return (
    <main>
      {/* Hero */}
      <div className="mx-auto max-w-[1160px] px-[18px] pb-[clamp(28px,4vw,44px)] pt-[clamp(26px,4vw,52px)] dt:px-8">
        <p className="mb-[18px] font-body text-[12px] uppercase tracking-[0.18em] text-accent">
          For record collectors
        </p>
        <h1 className="mb-5 max-w-[900px] font-display text-[clamp(38px,6.2vw,62px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text">
          Every record you own, want, and love — in one place.
        </h1>
        <p className="mb-[30px] max-w-[460px] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-muted">
          Catalogue your vinyl, build a wishlist of what&apos;s next, and share
          your shelf with fellow Collectors — no spreadsheet required.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/register"
            className="rounded-full bg-accent px-[26px] py-[14px] font-display text-[16px] font-semibold text-accent-text"
          >
            Create your collection
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-pill-border px-6 py-[14px] font-display text-[16px] font-semibold text-text"
          >
            Log in
          </Link>
        </div>
        <p className="mt-[22px] text-[14px] text-muted-2">
          Joined by 40,000+ collectors cataloguing their shelves.
        </p>
      </div>

      {/* Marquee */}
      {marqueeRow1.length > 0 ? (
        <div className="overflow-hidden border-y border-nav-border bg-surface py-[26px]">
          <p className="mx-auto mb-4 max-w-[1160px] px-[18px] font-body text-[12px] uppercase tracking-[0.16em] text-muted dt:px-8">
            Popular right now
          </p>
          <MarqueeRow items={marqueeRow1} />
          <MarqueeRow items={marqueeRow2} reverse />
        </div>
      ) : null}

      {/* Three steps */}
      <div className="mx-auto max-w-[1160px] px-[18px] py-[clamp(48px,7vw,80px)] dt:px-8">
        <h2 className="mb-10 text-center font-display text-[clamp(26px,3.5vw,34px)] font-extrabold tracking-[-0.03em] text-text">
          Three steps to a shelf you can share
        </h2>
        <div className="grid grid-cols-1 gap-[clamp(24px,3vw,40px)] dt:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-pill-border font-display text-[15px] font-extrabold text-accent">
                {step.n}
              </div>
              <h3 className="mb-2 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      {charts.length > 0 ? (
        <div className="border-t border-nav-border bg-surface">
          <div className="mx-auto max-w-[720px] px-[18px] py-[clamp(48px,7vw,76px)] dt:px-8">
            <div className="mb-[26px] flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-[clamp(24px,3.2vw,32px)] font-extrabold tracking-[-0.03em] text-text">
                Most Collected All Time
              </h2>
              <span className="font-body text-[12px] uppercase tracking-[0.1em] text-muted">
                The Charts
              </span>
            </div>
            {charts.map((album, i) => (
              <div
                key={album.id}
                className="flex items-center gap-[18px] border-b border-divider py-[14px]"
              >
                <span className="w-[26px] text-right font-display text-[18px] font-extrabold text-muted-2">
                  {i + 1}
                </span>
                <Cover
                  src={album.coverImage}
                  alt={`${album.albumTitle} cover image`}
                  className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[5px] shadow-cover"
                />
                <div className="min-w-0 flex-grow">
                  <p className="mb-[2px] truncate font-display text-[16px] font-semibold tracking-[-0.01em] text-text">
                    {album.albumTitle}
                  </p>
                  <p className="text-[14px] text-muted">{album.artist}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-[15px] font-bold text-text">
                    {formatCollectors(album.collectors ?? 0)}
                  </p>
                  <p className="text-[12px] text-muted">collectors</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* CTA */}
      <div className="mx-auto max-w-[1160px] px-[18px] py-[clamp(56px,8vw,96px)] text-center dt:px-8">
        <h2 className="mb-[14px] font-display text-[clamp(30px,4.5vw,46px)] font-extrabold tracking-[-0.03em] text-text">
          Start your collection today
        </h2>
        <p className="mb-7 text-[17px] text-muted">
          Free to join. Your shelf, catalogued in minutes.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-full bg-accent px-8 py-[15px] font-display text-[17px] font-semibold text-accent-text"
        >
          Sign up free
        </Link>
      </div>
    </main>
  );
}

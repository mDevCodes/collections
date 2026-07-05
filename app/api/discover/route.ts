import { NextResponse, NextRequest } from "next/server";
import discogs from "@/utils/discogs";
import { Album } from "@/schemas/collections.schemas";

// Discogs has no "trending" or "popularity" endpoint, and searching bare
// genre terms surfaces whatever obscure pressing best matches the query —
// not what a casual listener would recognize. Instead we search for a
// curated list of widely known, canonical albums (one best-matching vinyl
// release each) and let real Discogs "have" (collectors) counts rank them
// against each other. Cached for 30 minutes so content is stable and we
// don't hammer the Discogs API on every page view.
const ICONIC_ALBUM_SEEDS = [
  "Fleetwood Mac Rumours",
  "Michael Jackson Thriller",
  "Pink Floyd The Dark Side of the Moon",
  "The Beatles Abbey Road",
  "Nirvana Nevermind",
  "Amy Winehouse Back to Black",
  "Adele 21",
  "Daft Punk Discovery",
  "Kendrick Lamar good kid, m.A.A.d city",
  "Prince Purple Rain",
  "Stevie Wonder Songs in the Key of Life",
  "Radiohead OK Computer",
  "Marvin Gaye What's Going On",
  "Guns N' Roses Appetite for Destruction",
  "Metallica Master of Puppets",
  "David Bowie Ziggy Stardust",
  "Led Zeppelin IV",
  "The Rolling Stones Exile on Main St.",
  "Kanye West My Beautiful Dark Twisted Fantasy",
  "Beyonce Lemonade",
  "Taylor Swift 1989",
  "Billie Eilish When We All Fall Asleep",
  "Tame Impala Currents",
  "Frank Ocean Blonde",
  "The Weeknd After Hours",
  "ABBA Gold",
  "Bob Marley Legend",
  "Whitney Houston Whitney Houston",
  "Eagles Hotel California",
  "Bruce Springsteen Born In The U.S.A.",
];

const SEED_GENRES = ["Rock", "Jazz", "Electronic", "Hip Hop", "Soul", "Funk"];
const REVALIDATE_SECONDS = 1800;

async function fetchIconicPool(): Promise<Album[]> {
  const pages = await Promise.all(
    ICONIC_ALBUM_SEEDS.map((seed) =>
      discogs
        .simpleSearch(
          { search: seed, page: "1", perPage: "1" },
          { revalidateSeconds: REVALIDATE_SECONDS }
        )
        .catch(() => null)
    )
  );

  const byId = new Map<number, Album>();
  for (const page of pages) {
    if (!page) continue;
    for (const album of page.data) {
      if (!byId.has(album.id)) byId.set(album.id, album);
    }
  }

  return Array.from(byId.values()).sort(
    (a, b) => (b.collectors ?? 0) - (a.collectors ?? 0)
  );
}

async function fetchGenrePool(genres: string[]): Promise<Album[]> {
  const pages = await Promise.all(
    genres.map((genre) =>
      discogs
        .simpleSearch(
          { search: genre, page: "1", perPage: "20" },
          { revalidateSeconds: REVALIDATE_SECONDS }
        )
        .catch(() => null)
    )
  );

  const byId = new Map<number, Album>();
  for (const page of pages) {
    if (!page) continue;
    for (const album of page.data) {
      if (!byId.has(album.id)) byId.set(album.id, album);
    }
  }

  return Array.from(byId.values()).sort(
    (a, b) => (b.collectors ?? 0) - (a.collectors ?? 0)
  );
}

export async function GET(request: NextRequest) {
  const genresParam = request.nextUrl.searchParams.get("genres");
  const recommendGenres = genresParam
    ? genresParam
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
        .slice(0, 2)
    : [];

  const [pool, recommendedPool] = await Promise.all([
    fetchIconicPool(),
    recommendGenres.length ? fetchGenrePool(recommendGenres) : Promise.resolve([]),
  ]);

  const currentYear = new Date().getFullYear();
  const newItems = pool
    .filter((a) => a.year && Number(a.year) >= currentYear - 1)
    .sort((a, b) => Number(b.year) - Number(a.year));

  return NextResponse.json({
    popular: pool.slice(0, 24),
    charts: pool.slice(0, 6),
    trending: pool.slice(0, 6),
    newItems: newItems.slice(0, 6),
    recommended: recommendedPool.slice(0, 6),
  });
}

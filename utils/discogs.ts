import { z } from "zod";
import { DiscogsSearchResponseSchema } from "../schemas/discogs.schemas";
import splitTitle from "./splitTitle";
import { SearchResponseSchema } from "@/schemas/collections.schemas";

type DiscogsResult = z.infer<typeof DiscogsSearchResponseSchema>["results"][number];

const BASE_PARAMS = {
  token: process.env.DISCOGS_API_KEY!,
  type: "release",
  format: "Vinyl",
};

// How many pages of the artist-field search to pull together when building
// a full discography. Discogs orders by its own relevance, not
// chronologically, so a real album (e.g. a 2012 release) can land on page 2
// while the first page is dominated by more "wanted" reissues - a single
// page isn't reliably complete. This is a generous-enough window to capture
// any artist's studio discography without unbounded API usage.
const ARTIST_PAGES_FOR_DISCOGRAPHY = 4;

const EMPTY_SEARCH_PAGE: z.infer<typeof DiscogsSearchResponseSchema> = {
  pagination: { page: 1, pages: 1 },
  results: [],
};

async function fetchSearchPage(
  params: Record<string, string>
): Promise<z.infer<typeof DiscogsSearchResponseSchema>> {
  const url = "https://api.discogs.com/database/search?" + new URLSearchParams(params);
  const response = await fetch(url);
  const json = await response.json();
  const parsed = DiscogsSearchResponseSchema.safeParse(json);
  // Discogs errors on out-of-range pages (e.g. requesting page 4 of an
  // artist with only 2 pages of results) instead of returning an empty
  // page, which would otherwise take down every other in-flight request.
  return parsed.success ? parsed.data : EMPTY_SEARCH_PAGE;
}

function isRealAlbum(result: DiscogsResult): boolean {
  return (
    Boolean(result.title) &&
    result.format.includes("Album") &&
    !result.format.includes("Unofficial Release")
  );
}

// Discogs assigns the same master_id to every pressing/reissue of an album,
// so this collapses e.g. 40 colored-vinyl variants of "Nevermind" down to
// the single most-wanted pressing.
function dedupeByMaster(results: DiscogsResult[]): DiscogsResult[] {
  const groups = new Map<number, DiscogsResult>();
  for (const result of results) {
    if (!isRealAlbum(result)) continue;
    const key = result.master_id || result.id;
    const existing = groups.get(key);
    if (!existing || (result.community?.want ?? 0) > (existing.community?.want ?? 0)) {
      groups.set(key, result);
    }
  }
  return Array.from(groups.values());
}

type MasterDetails = { year?: string; coverImage?: string };

// A release search result's own year/cover_image belong to whichever
// specific pressing happened to have the highest want count, not the album
// itself - e.g. a 2009 reissue's year and a different physical copy's photo
// instead of the true 2006 release and its canonical artwork. The master's
// own `main_release` is Discogs' designated "this is the album" release, so
// we use its year and cover image instead. Cached per-process since the
// same popular albums get looked up across many searches. Only used for the
// confirmed-artist discography bucket below - it's 2 extra Discogs calls
// per album, too expensive to spend on the low-confidence "other matches".
const masterDetailsCache = new Map<number, MasterDetails>();

async function fetchMasterDetails(masterId: number): Promise<MasterDetails> {
  if (masterDetailsCache.has(masterId)) {
    return masterDetailsCache.get(masterId)!;
  }
  try {
    const masterResponse = await fetch(
      `https://api.discogs.com/masters/${masterId}?token=${process.env.DISCOGS_API_KEY}`
    );
    if (!masterResponse.ok) return {};
    const master = await masterResponse.json();

    let coverImage: string | undefined;
    if (master.main_release) {
      const releaseResponse = await fetch(
        `https://api.discogs.com/releases/${master.main_release}?token=${process.env.DISCOGS_API_KEY}`
      );
      if (releaseResponse.ok) {
        const release = await releaseResponse.json();
        coverImage = release.images?.[0]?.uri;
      }
    }

    const details: MasterDetails = {
      year: master.year ? String(master.year) : undefined,
      coverImage,
    };
    masterDetailsCache.set(masterId, details);
    return details;
  } catch {
    return {};
  }
}

async function enrichWithMasterDetails(
  results: DiscogsResult[]
): Promise<(DiscogsResult & MasterDetails)[]> {
  return Promise.all(
    results.map(async (album) => {
      const details = album.master_id
        ? await fetchMasterDetails(album.master_id)
        : {};
      // Spreading `details` directly would overwrite year/coverImage with
      // `undefined` whenever the master lookup succeeds but is missing a
      // field, clobbering a perfectly good pressing-level fallback value.
      return {
        ...album,
        year: details.year ?? album.year,
        coverImage: details.coverImage ?? album.cover_image,
      };
    })
  );
}

function mapAlbum(album: DiscogsResult & Partial<MasterDetails>) {
  return {
    id: album.id,
    coverImage: album.coverImage ?? album.cover_image,
    albumTitle: splitTitle(album.title).album,
    artist: splitTitle(album.title).artist,
    year: album.year,
    genre: album.genre?.[0],
    formats: album.formats,
  };
}

// An exact artist-name match is only trustworthy when it's actually the
// more popular match - otherwise the query is probably an album title (e.g.
// "Nevermind") that happens to collide with some obscure, unrelated artist
// of the same name, and want-based ranking should win instead.
const maxWant = (albums: DiscogsResult[]) =>
  Math.max(0, ...albums.map((album) => album.community?.want ?? 0));

const discogs = {
  search: async (query: {
    search: string;
    page: string;
  }): Promise<z.infer<typeof SearchResponseSchema>> => {
    const normalizedQuery = query.search.trim().toLowerCase();
    const isExactArtistMatch = (result: DiscogsResult) =>
      splitTitle(result.title).artist.trim().toLowerCase() === normalizedQuery;

    // The first page builds a complete, chronological discography for an
    // exact artist match. Later "More Results" pages just page through the
    // looser album-title matches - the discography itself was already
    // delivered in full on page 1, so there's nothing more of it to fetch.
    if (query.page === "1" || !query.page) {
      const per_page = "25";
      const artistPages = await Promise.all(
        Array.from({ length: ARTIST_PAGES_FOR_DISCOGRAPHY }, (_, index) =>
          fetchSearchPage({
            artist: query.search,
            ...BASE_PARAMS,
            per_page,
            page: String(index + 1),
          })
        )
      );
      const titleData = await fetchSearchPage({
        release_title: query.search,
        ...BASE_PARAMS,
        per_page,
        page: "1",
      });

      const artistResults = dedupeByMaster(artistPages.flatMap((page) => page.results));
      const discography = artistResults.filter(isExactArtistMatch);
      const discographyKeys = new Set(
        discography.map((album) => album.master_id || album.id)
      );

      const otherMatchesRaw = dedupeByMaster([
        ...artistResults.filter((album) => !isExactArtistMatch(album)),
        ...dedupeByMaster(titleData.results),
      ]).filter((album) => !discographyKeys.has(album.master_id || album.id));
      // A pure album-title search (e.g. "Nevermind") never has an exact
      // artist-name match, so its correct answer always lands here rather
      // than in the discography bucket - only enrich the few likely to
      // actually be that answer, to keep this bucket cheap.
      otherMatchesRaw.sort((a, b) => (b.community?.want ?? 0) - (a.community?.want ?? 0));
      const otherMatches = [
        ...(await enrichWithMasterDetails(otherMatchesRaw.slice(0, 3))),
        ...otherMatchesRaw.slice(3),
      ];

      const discographyEnriched = await enrichWithMasterDetails(discography);

      let sortedResults: (DiscogsResult & Partial<MasterDetails>)[];
      if (discographyEnriched.length > 0 && maxWant(discographyEnriched) >= maxWant(otherMatches)) {
        // The searched artist's own catalog reads like a discography,
        // sorted newest-first; everything else is a looser match ranked by
        // Discogs' community "want" count as a relevance proxy instead.
        discographyEnriched.sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
        sortedResults = [...discographyEnriched, ...otherMatches];
      } else {
        sortedResults = [...discographyEnriched, ...otherMatches].sort(
          (a, b) => (b.community?.want ?? 0) - (a.community?.want ?? 0)
        );
      }

      return {
        data: sortedResults.map(mapAlbum),
        currentPage: 1,
        isLastPage: titleData.pagination.page === titleData.pagination.pages,
      };
    }

    const titleData = await fetchSearchPage({
      release_title: query.search,
      ...BASE_PARAMS,
      per_page: "25",
      page: query.page,
    });
    const matchesRaw = dedupeByMaster(titleData.results);
    matchesRaw.sort((a, b) => (b.community?.want ?? 0) - (a.community?.want ?? 0));
    const matches = [
      ...(await enrichWithMasterDetails(matchesRaw.slice(0, 3))),
      ...matchesRaw.slice(3),
    ];

    return {
      data: matches.map(mapAlbum),
      currentPage: titleData.pagination.page,
      isLastPage: titleData.pagination.page === titleData.pagination.pages,
    };
  },
};

export default discogs;

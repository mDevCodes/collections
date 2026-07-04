import { z } from "zod";
import { DiscogsSearchResponseSchema } from "../schemas/discogs.schemas";
import splitTitle from "./splitTitle";
import { SearchResponseSchema } from "@/schemas/collections.schemas";

type DiscogsResult = z.infer<typeof DiscogsSearchResponseSchema>["results"][number];

const BASE_PARAMS = {
  token: process.env.DISCOGS_API_KEY!,
  type: "release",
  format: "Vinyl",
  country: "US",
};

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

const discogs = {
  search: async (query: {
    search: string;
    page: string;
  }): Promise<z.infer<typeof SearchResponseSchema>> => {
    const pageParams = { per_page: "25", page: String(query.page) };

    // Discogs' generic full-text search matches labels/credits too (e.g.
    // searching "Muse" pulls in unrelated jazz LPs on the "Muse" label), so
    // we search the artist and release-title fields directly instead, and
    // merge the two so both "search by artist" and "search by album title"
    // work.
    const artistUrl =
      "https://api.discogs.com/database/search?" +
      new URLSearchParams({ artist: query.search, ...BASE_PARAMS, ...pageParams });
    const titleUrl =
      "https://api.discogs.com/database/search?" +
      new URLSearchParams({
        release_title: query.search,
        ...BASE_PARAMS,
        ...pageParams,
      });

    const [artistResult, titleResult] = await Promise.all([
      fetch(artistUrl),
      fetch(titleUrl),
    ]);
    const [artistJson, titleJson] = await Promise.all([
      artistResult.json(),
      titleResult.json(),
    ]);

    const artistData = DiscogsSearchResponseSchema.parse(artistJson);
    const titleData = DiscogsSearchResponseSchema.parse(titleJson);

    // Discogs disambiguates unrelated artists that happen to share a name
    // with a suffix (e.g. "Muse (9)", "Muse (10)"), so an exact,
    // case-insensitive match against the query reliably isolates the actual
    // artist's own catalog from name collisions.
    const normalizedQuery = query.search.trim().toLowerCase();
    const isExactArtistMatch = (result: DiscogsResult) =>
      splitTitle(result.title).artist.trim().toLowerCase() === normalizedQuery;

    const artistResults = dedupeByMaster(artistData.results);
    const discography = artistResults.filter(isExactArtistMatch);
    const discographyKeys = new Set(
      discography.map((album) => album.master_id || album.id)
    );

    const otherMatches = dedupeByMaster([
      ...artistResults.filter((album) => !isExactArtistMatch(album)),
      ...dedupeByMaster(titleData.results),
    ]).filter((album) => !discographyKeys.has(album.master_id || album.id));

    // An exact artist-name match is only trustworthy when it's actually
    // the more popular match - otherwise the query is probably an album
    // title (e.g. "Nevermind") that happens to collide with some obscure,
    // unrelated artist of the same name, and want-based ranking should win.
    const maxWant = (albums: DiscogsResult[]) =>
      Math.max(0, ...albums.map((album) => album.community?.want ?? 0));

    let sortedResults: DiscogsResult[];
    if (discography.length > 0 && maxWant(discography) >= maxWant(otherMatches)) {
      // The searched artist's own catalog reads like a discography, sorted
      // newest-first; everything else is a looser match ranked by Discogs'
      // community "want" count as a relevance proxy instead.
      discography.sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
      otherMatches.sort((a, b) => (b.community?.want ?? 0) - (a.community?.want ?? 0));
      sortedResults = [...discography, ...otherMatches];
    } else {
      sortedResults = [...discography, ...otherMatches].sort(
        (a, b) => (b.community?.want ?? 0) - (a.community?.want ?? 0)
      );
    }

    const searchResponseData = {
      data: sortedResults.map((album) => ({
        id: album.id,
        coverImage: album.cover_image,
        albumTitle: splitTitle(album.title).album,
        artist: splitTitle(album.title).artist,
        year: album.year,
        genre: album.genre?.[0],
        formats: album.formats,
      })),
      currentPage: artistData.pagination.page,
      isLastPage:
        artistData.pagination.page === artistData.pagination.pages &&
        titleData.pagination.page === titleData.pagination.pages,
    };

    return searchResponseData;
  },
};

export default discogs;

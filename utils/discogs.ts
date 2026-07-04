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

    const combined = [
      ...dedupeByMaster(artistData.results),
      ...dedupeByMaster(titleData.results),
    ];
    const deduped = dedupeByMaster(combined);
    // Discogs' community "want" count is a much better relevance signal
    // than raw text-match ranking: it reliably surfaces the album someone
    // actually meant instead of an obscure record that just shares a word.
    deduped.sort((a, b) => (b.community?.want ?? 0) - (a.community?.want ?? 0));

    const searchResponseData = {
      data: deduped.map((album) => ({
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

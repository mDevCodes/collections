import { z } from "zod";
import { DiscogsSearchResponseSchema } from "../schemas/discogs.schemas";
import splitTitle from "./splitTitle";
import { SearchResponseSchema } from "@/schemas/collections.schemas";

const discogs = {
  search: async (query: {
    search: string;
    page: string;
  }): Promise<z.infer<typeof SearchResponseSchema>> => {
    // define url for GET API call
    // type: "master" groups every pressing/reissue of an album under a single
    // result, instead of returning each vinyl variant as its own entry
    const searchParams = new URLSearchParams({
      q: query.search,
      type: "master",
      token: process.env.DISCOGS_API_KEY!,
      country: "US",
      format: "Vinyl",
      per_page: "40",
      page: String(query.page),
    });

    const url = "https://api.discogs.com/database/search?" + searchParams;

    // GET call to Discogs API
    const result = await fetch(url);
    const data = await result.json();

    const narrowedData = DiscogsSearchResponseSchema.parse(data);

    const searchResponseData = {
      data: narrowedData.results
        .filter(
          (album) =>
            Boolean(album.title) &&
            album.format.includes("Album") &&
            !album.format.includes("Unofficial Release")
        )
        // Discogs' relevance ranking surfaces plenty of unrelated albums
        // that happen to share a word with the query; community "want"
        // count is a much better proxy for "is this the album people meant"
        .sort(
          (a, b) => (b.community?.want ?? 0) - (a.community?.want ?? 0)
        )
        .map((album) => {
          const [formatName, ...formatDescriptions] = album.format;
          const result = {
            id: album.id,
            coverImage: album.cover_image,
            albumTitle: splitTitle(album.title).album,
            artist: splitTitle(album.title).artist,
            year: album.year,
            genre: album.genre?.[0],
            formats: [
              {
                name: formatName ?? "Vinyl",
                qty: "1",
                descriptions: formatDescriptions,
              },
            ],
          };
          return result;
        }),
      currentPage: narrowedData.pagination.page,
      isLastPage:
        narrowedData.pagination.page === narrowedData.pagination.pages,
    };

    return searchResponseData;
  },
};

export default discogs;

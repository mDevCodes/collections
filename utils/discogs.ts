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
    const searchParams = new URLSearchParams({
      q: query.search,
      type: "release",
      token: process.env.DISCOGS_API_KEY!,
      country: "US",
      format: "Vinyl",
      per_page: "10",
      page: String(query.page),
    });

    const url = "https://api.discogs.com/database/search?" + searchParams;

    // GET call to Discogs API
    const result = await fetch(url);
    const data = await result.json();
    // console.log("🚀 ~ file: discogs.ts:27 ~ data:", data);

    const narrowedData = DiscogsSearchResponseSchema.parse(data);

    const searchResponseData = {
      ...narrowedData,
      results: narrowedData.results
        .filter((album) => Boolean(album.title))
        .map((album) => {
          const result = {
            id: album.id,
            coverImage: album.cover_image,
            albumTitle: splitTitle(album.title).album,
            artist: splitTitle(album.title).artist,
            year: album.year,
            formats: album.formats,
          };
          return result;
        }),
    };

    return searchResponseData;
  },
};

export default discogs;

import { z } from "zod";
import { SearchResponseSchema, DiscogsResponseSchema } from "./discogs.schemas";
import splitTitle from "./splitTitle";

const discogs = {
  search: async (
    search: string
  ): Promise<z.infer<typeof SearchResponseSchema>> => {
    // define url for GET API call
    const searchParams = new URLSearchParams({
      q: search,
      type: "release",
      token: process.env.DISCOGS_API_KEY!,
      country: "US",
      format: "Vinyl",
    });

    const url = "https://api.discogs.com/database/search?" + searchParams;

    // GET call to Discogs API
    const result = await fetch(url);
    const data = await result.json();

    const narrowedData = DiscogsResponseSchema.parse(data);

    const searchResponseData = narrowedData.results
      .filter((album) => Boolean(album.title))
      .map((album) => {
        const result = {
          id: album.id,
          cover_image: album.cover_image,
          albumTitle: splitTitle(album.title).album,
          artist: splitTitle(album.title).artist,
          year: album.year,
        };

        return result;
      });

    return { results: searchResponseData };
  },
};

export default discogs;

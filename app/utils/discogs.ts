import { z } from "zod";
import { DiscogsSearchResponseSchema } from "../../schemas/discogs.schemas";
import splitTitle from "./splitTitle";
import { SearchResponseSchema } from "@/schemas/collections.schemas";

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

    const narrowedData = DiscogsSearchResponseSchema.parse(data);

    const searchResponseData = narrowedData.results
      .filter((album) => Boolean(album.title))
      .map((album) => {
        const result = {
          id: album.id,
          coverImage: album.cover_image,
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

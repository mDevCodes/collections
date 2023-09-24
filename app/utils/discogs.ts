import { z } from "zod";
import { DiscogsResponseSchema } from "./discogs.schemas";

const discogs = {
  search: async (
    search: string
  ): Promise<z.infer<typeof DiscogsResponseSchema>> => {
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

      // check and narrow data shape
      const parsedData = DiscogsResponseSchema.parse(data);
    return parsedData;
  },
};
 
export default discogs;

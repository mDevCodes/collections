import { z } from "zod";
import { Album, SearchResponseSchema } from "./discogs.schemas";

const discogs = {
  search: async (search: string): Promise <z.infer<typeof SearchResponseSchema>> => {
    // define url for GET API call
    const searchParams = new URLSearchParams({
      q: search,
      type: "release",
      token: process.env.DISCOGS_API_KEY!,
    });
    const url = "https://api.discogs.com/database/search?" + searchParams;
  
    // GET call to Discogs API
    const result = await fetch(url);
    const data = await result.json();

    // schema check using Zod
    SearchResponseSchema.parse(data);
    return data;
  }
}

export default discogs;

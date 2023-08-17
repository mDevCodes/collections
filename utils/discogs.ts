import { SearchResponseSchema } from "./discogs.schemas";

const discogs = {
  search: async () => {
    // define url for GET API call
    const baseUrl = "https://api.discogs.com/database/search?";
    const paramsObj = {
      q: "Nirvana",
      type: "release",
      token: process.env.DISCOGS_API_KEY!,
    };
    const searchParams = new URLSearchParams(paramsObj);
    const url = baseUrl + searchParams;
    console.log("🚀 ~ file: discogs.ts:14 ~ search: ~ url:", url)

    // GET call to Discogs API
    const result = await fetch(url);
    console.log("🚀 ~ file: discogs.ts:17 ~ search: ~ result:", result)
    const data = await result.json();
    console.log("🚀 ~ file: discogs.ts:18 ~ search: ~ data:", data)
    // schema check using Zod
    SearchResponseSchema.parse(data);
    console.log("🚀 ~ file: discogs.ts:20 ~ search: ~ SearchResponseSchema:", SearchResponseSchema)
    console.log("type of result: ", typeof data)

    return data;
  },
};

export default discogs;

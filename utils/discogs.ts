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

    // GET call to Discogs API
    const result = await fetch(url);
    const data = await result.json();
    console.log("🚀 ~ file: SearchApi.tsx:18 ~ search: ~ data:", data);

    // schema check using Zod
    SearchResponseSchema.parse(data);

    return data;
  },
};

export default discogs;

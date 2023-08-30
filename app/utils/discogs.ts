import { SearchResponseSchema } from "./discogs.schemas";

type props = string;
type searchResult = {
  results: [{ year?: string }];
};

async function discogs(search: props): Promise<searchResult>  {
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
};

export default discogs;

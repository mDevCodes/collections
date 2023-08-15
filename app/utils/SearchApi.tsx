const discogs = {
  search: async () => {
    const baseUrl = "https://api.discogs.com/database/search?";
    const paramsObj = {
      q: "Nirvana",
      type: "release",
      token: process.env.DISCOGS_API_KEY!,
    };
    const searchParams = new URLSearchParams(paramsObj);
    const url = baseUrl + searchParams;
    const result = await fetch(url);
    return result.json();
  },
};

export default discogs;

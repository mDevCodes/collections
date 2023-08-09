export const getData = async () => {
  const baseUrl = "https://api.discogs.com/database/search?q=";
  const search = "Nirvana";
  const token = `token=${process.env.DISCOGS_API_KEY}`;
  const url = baseUrl + search + "&" + token;

  //   const baseUrl = "https://swapi.dev/api/";
  //   const search = "people/2/";
  //   const url = baseUrl + search;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

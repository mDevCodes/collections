import discogs from "./utils/SearchApi";

export default async function Home() {
  const result = await discogs.search();

  return (
    <main className="flex flex-col items-center justify-center mt-60">
      <h1 className="font-bold text-6xl">Home Page</h1>
      <h1 className="font-bold text-6xl">
        Search Result title: {result.results[0].year}
      </h1>
    </main>
  );
}

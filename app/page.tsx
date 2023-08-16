import discogs from "../utils/discogs";

export default async function Home() {
  const result = await discogs.search();

  return (
    <main className="flex flex-col items-center justify-center mt-60">
      <h1 className="font-bold text-6xl">Home Page</h1>
    </main>
  );
}

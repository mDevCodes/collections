import { getData } from "./utils/SearchApi";

export default async function Home() {
  const searchData = await getData();
  console.log(searchData.results[0].title);
  return (
    <main className="flex justify-center mt-60">
      <h1 className="font-bold text-6xl">HOME PAGE</h1>
    </main>
  );
}

import { getData } from "./utils/SearchApi";
import SearchSchema from "./schema/get-search-api-data-schema";

export default async function Home() {
  const searchData = await getData();
  const zodCheck = SearchSchema.safeParse(searchData);
  console.log(searchData.results);

  return (
    <main className="flex flex-col items-center justify-center mt-60">
      <h1 className="font-bold text-6xl">Home Page</h1>
      <h1 className="font-bold text-6xl">
        Search Result title: {searchData.results[0].title}
      </h1>
      <h1 className="font-bold text-6xl">{`Zod Pass: ${zodCheck.success}`}</h1>
    </main>
  );
}

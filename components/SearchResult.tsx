import { useQuery } from "@tanstack/react-query";
import Result from "./Result";
import { Album, SearchResponseSchema } from "@/schemas/collections.schemas";
import Icon from "./Icon";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: searchValue,
      });
      const res = await fetch("/api/search?" + params);
      const data = await res.json();
      const parsedData = SearchResponseSchema.parse(data);

      return parsedData;
    },
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <>
      <div className="flex w-full items-center gap-6 mb-6 border-bottom-solid border-gray-800">
        <div className="relative w-24 h-24 lg:w-36 lg:h-36 shrink-0 overflow-hidden">
          <Icon
            className="w-full h-full text-white bg-gray-800 p-7 lg:p-10"
            type="no-img"
            size="medium"
          />
        </div>

        <div>
          <div className="mb-[4.5px] h-3.5 w-40 bg-gray-800"></div>
          <div className="mb-[4.5px] h-3 w-32 bg-gray-800"></div>
          <div className="h-3 w-11 bg-gray-800"></div>
        </div>
      </div>
      {data.results.map((album: Album) => (
        <Result key={album.id} album={album} />
      ))}
    </>
  );
}

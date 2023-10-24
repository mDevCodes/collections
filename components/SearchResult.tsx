import { useQuery } from "@tanstack/react-query";
import Result from "./Result";
import { Album, SearchResponseSchema } from "@/schemas/collections.schemas";
import ResultLoading from "./ResultLoading";
import { PulseLoader } from "react-spinners";
import { CSSProperties } from "react";

export default function SearchResult({ searchValue }: { searchValue: string }) {
  const { data, isError, isLoading, isSuccess } = useQuery({
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
    const override: CSSProperties = {
      marginBottom: "12px",
    };
    const loadingUiArray = Array(10).fill(null);
    return (
      <>
        <PulseLoader
          color="white"
          loading={isLoading}
          size={10}
          cssOverride={override}
        />
        {loadingUiArray.map((_, index) => (
          <ResultLoading key={index} />
        ))}
      </>
    );
  }

  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <>
      <div className="w-full lg:h-3.5 lg:mb-3"></div>
      {data?.results.map((album: Album) => (
        <Result key={album.id} album={album} />
      ))}
    </>
  );
}

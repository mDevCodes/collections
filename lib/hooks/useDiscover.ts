import { useQuery } from "@tanstack/react-query";
import { Album } from "@/schemas/collections.schemas";

export type DiscoverResponse = {
  popular: Album[];
  charts: Album[];
  trending: Album[];
  newItems: Album[];
  recommended: Album[];
};

export function useDiscover(genres?: string[]) {
  const genreParam = genres?.length ? genres.join(",") : "";

  return useQuery({
    queryKey: ["discover", genreParam],
    queryFn: async (): Promise<DiscoverResponse> => {
      const params = new URLSearchParams();
      if (genreParam) params.set("genres", genreParam);
      const res = await fetch(`/api/discover?${params}`);
      if (!res.ok) throw new Error("Failed to load discovery data");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

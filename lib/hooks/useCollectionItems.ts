import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Album, CollectionItem, ListType } from "@/schemas/collections.schemas";
import useUser from "@/lib/supabase/useUser";

export function useCollectionItems(listType: ListType) {
  const { user } = useUser();

  return useQuery({
    queryKey: ["collection-items", listType, user?.id],
    queryFn: async (): Promise<CollectionItem[]> => {
      const res = await fetch(`/api/collection-items?listType=${listType}`);
      if (!res.ok) throw new Error("Failed to load items");
      const { data } = await res.json();
      return data;
    },
    enabled: !!user,
  });
}

export function useToggleCollectionItem(listType: ListType) {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["collection-items", listType] });

  const add = useMutation({
    mutationFn: async (album: Album) => {
      const res = await fetch("/api/collection-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discogsId: album.id,
          listType,
          albumTitle: album.albumTitle,
          artist: album.artist,
          coverImage: album.coverImage,
          year: album.year ?? null,
        }),
      });
      if (!res.ok) throw new Error("Failed to save item");
      return res.json();
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (discogsId: number) => {
      const res = await fetch(
        `/api/collection-items?listType=${listType}&discogsId=${discogsId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to remove item");
      return res.json();
    },
    onSuccess: invalidate,
  });

  return { add, remove };
}

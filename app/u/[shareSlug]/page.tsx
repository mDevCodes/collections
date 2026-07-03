import Image from "next/image";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type CollectionItemRow = {
  id: string;
  discogs_id: number;
  list_type: "collection" | "wishlist";
  album_title: string;
  artist: string;
  cover_image: string | null;
  year: string | null;
};

function ItemGrid({ items }: { items: CollectionItemRow[] }) {
  if (items.length === 0) {
    return <p className="text-gray-400 mb-8">Nothing here yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
      {items.map((item) => (
        <div key={item.id} className="text-sm">
          <div className="relative w-full aspect-square overflow-hidden mb-2">
            {item.cover_image ? (
              <Image
                className="rounded-sm object-cover w-full"
                src={item.cover_image}
                alt={`${item.album_title} cover image`}
                fill
              />
            ) : (
              <Icon
                className="w-full h-full text-white bg-gray-800 p-7"
                type="no-img"
                size="medium"
              />
            )}
          </div>
          <p className="font-bold">{item.album_title}</p>
          <p>{item.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default async function SharedCollectionPage({
  params,
}: {
  params: { shareSlug: string };
}) {
  if (!isSupabaseConfigured()) {
    notFound();
  }

  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("share_slug", params.shareSlug)
    .single();

  if (!profile) {
    notFound();
  }

  const { data: items } = await supabase
    .from("collection_items")
    .select("id, discogs_id, list_type, album_title, artist, cover_image, year")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  const collection = (items ?? []).filter(
    (item) => item.list_type === "collection"
  );
  const wishlist = (items ?? []).filter((item) => item.list_type === "wishlist");

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-heading mt-10 mb-8">
        {profile.username}&apos;s Collection
      </h1>

      <h2 className="text-xl font-bold mb-4">Wishlist</h2>
      <ItemGrid items={wishlist} />

      <h2 className="text-xl font-bold mb-4">Collection</h2>
      <ItemGrid items={collection} />
    </div>
  );
}

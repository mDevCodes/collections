import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/Cover";
import Avatar from "@/components/Avatar";
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
    return <p className="mb-11 text-[14px] text-muted">Nothing here yet.</p>;
  }

  return (
    <div className="mb-11 grid grid-cols-2 gap-[22px_18px] dt:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      {items.map((item) => (
        <div key={item.id}>
          <Cover
            src={item.cover_image}
            alt={`${item.album_title} cover image`}
            className="relative mb-[10px] aspect-square overflow-hidden rounded-[7px] shadow-cover"
          />
          <p className="mb-px font-display text-[13px] font-semibold leading-[1.2] text-text">
            {item.album_title}
          </p>
          <p className="text-[12px] text-muted">{item.artist}</p>
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
    .select("id, username, display_name, avatar_variant")
    .eq("share_slug", params.shareSlug)
    .single();

  if (!profile) {
    notFound();
  }

  const name = profile.display_name ?? profile.username;

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
    <main className="mx-auto max-w-[1160px] px-[18px] pb-24 pt-6 dt:px-8 dt:pb-20 dt:pt-10">
      <Link
        href="/user-profile"
        className="mb-[22px] inline-block font-display text-[14px] font-medium text-muted"
      >
        ← Back to profile
      </Link>

      <div className="mb-10 flex items-center gap-4">
        {profile.avatar_variant !== null && profile.avatar_variant !== undefined ? (
          <Avatar variant={profile.avatar_variant} size={48} animate={false} />
        ) : (
          <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-accent to-[#d98a4a]" />
        )}
        <div>
          <h1 className="mb-1 font-display text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-text">
            {name}&apos;s Collection
          </h1>
          <p className="text-[15px] text-muted">A public collection on Record Collections</p>
        </div>
      </div>

      <h2 className="mb-[18px] font-display text-[14px] font-bold uppercase tracking-[0.04em] text-muted">
        Wishlist · {wishlist.length}
      </h2>
      <ItemGrid items={wishlist} />

      <h2 className="mb-[18px] font-display text-[14px] font-bold uppercase tracking-[0.04em] text-muted">
        Collection · {collection.length}
      </h2>
      <ItemGrid items={collection} />
    </main>
  );
}

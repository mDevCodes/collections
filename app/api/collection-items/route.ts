import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { CollectionItem, ListTypeSchema } from "@/schemas/collections.schemas";

const CreateItemSchema = z.object({
  discogsId: z.number(),
  listType: ListTypeSchema,
  albumTitle: z.string(),
  artist: z.string(),
  coverImage: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
});

function toCollectionItem(row: {
  id: string;
  discogs_id: number;
  list_type: string;
  album_title: string;
  artist: string;
  cover_image: string | null;
  year: string | null;
}): CollectionItem {
  return {
    id: row.id,
    discogsId: row.discogs_id,
    listType: row.list_type as CollectionItem["listType"],
    albumTitle: row.album_title,
    artist: row.artist,
    coverImage: row.cover_image,
    year: row.year,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const listType = ListTypeSchema.parse(searchParams.get("listType"));

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("collection_items")
    .select("id, discogs_id, list_type, album_title, artist, cover_image, year")
    .eq("user_id", user.id)
    .eq("list_type", listType)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data.map(toCollectionItem) });
}

export async function POST(request: Request) {
  const body = CreateItemSchema.parse(await request.json());

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("collection_items")
    .upsert(
      {
        user_id: user.id,
        list_type: body.listType,
        discogs_id: body.discogsId,
        album_title: body.albumTitle,
        artist: body.artist,
        cover_image: body.coverImage ?? null,
        year: body.year ?? null,
      },
      { onConflict: "user_id,list_type,discogs_id" }
    )
    .select("id, discogs_id, list_type, album_title, artist, cover_image, year")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: toCollectionItem(data) }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const listType = ListTypeSchema.parse(searchParams.get("listType"));
  const discogsId = Number(searchParams.get("discogsId"));

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { error } = await supabase
    .from("collection_items")
    .delete()
    .eq("user_id", user.id)
    .eq("list_type", listType)
    .eq("discogs_id", discogsId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

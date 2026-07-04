import { NextResponse, NextRequest } from "next/server";
import discogs from "@/utils/discogs";
import { z } from "zod";
import { SearchResponseSchema } from "@/schemas/collections.schemas";

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<z.infer<typeof SearchResponseSchema> | { error: string }>
> {
  const { searchParams } = new URL(request.url);
  const query = {
    search: request.nextUrl.searchParams.get("search") || "",
    page: request.nextUrl.searchParams.get("page") || "",
  };

  if (query === null) {
    return NextResponse.json(
      { error: "query search parameter required" },
      { status: 400 }
    );
  }

  try {
    const res = await discogs.search(query);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Discogs search failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 502 }
    );
  }
}

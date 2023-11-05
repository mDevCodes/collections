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

  const res = await discogs.search(query);
  console.log("🚀 ~ file: route.ts:25 ~ res:", res);
  return NextResponse.json(res);
}

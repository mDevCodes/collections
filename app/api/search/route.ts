import { NextResponse, NextRequest } from "next/server";
import discogs from "@/app/utils/discogs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = request.nextUrl.searchParams.get("search");

  if (query === null) {
    return NextResponse.json(
      { error: "query search parameter required" },
      { status: 400 }
    );
  }

  const res = await discogs.search(query);
  return NextResponse.json(res);
}

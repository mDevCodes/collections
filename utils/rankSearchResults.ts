import { Album } from "@/schemas/collections.schemas";

function wordBoundaryMatch(haystack: string, needle: string) {
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(haystack);
}

function relevanceScore(album: Album, query: string): number {
  const artist = album.artist.trim();
  const title = album.albumTitle.trim();
  const normalizedQuery = query.trim();

  if (artist.toLowerCase() === normalizedQuery.toLowerCase()) return 3;
  if (wordBoundaryMatch(artist, normalizedQuery)) return 2;
  if (wordBoundaryMatch(title, normalizedQuery)) return 1;
  return 0;
}

export default function rankSearchResults(albums: Album[], query: string): Album[] {
  if (!query.trim()) return albums;

  // Stable sort (Array#sort is stable in Node/V8) -- results tie on score
  // keep Discogs' original relevance order relative to each other, we're
  // only pulling artist-name matches ahead of incidental/track-title matches.
  return [...albums].sort(
    (a, b) => relevanceScore(b, query) - relevanceScore(a, query)
  );
}

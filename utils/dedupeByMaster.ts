import { Album } from "@/schemas/collections.schemas";

// Collapses multiple pressings of the same album (grouped by Discogs'
// master_id) down to one representative entry, keeping whichever pressing
// appears first -- callers should rank results before deduping so the
// highest-relevance pressing of each album is the one kept. Releases with
// no master_id (not part of a master group) are left as their own entry.
export default function dedupeByMaster(albums: Album[]): Album[] {
  const seen = new Map<string, Album>();

  for (const album of albums) {
    const key = album.masterId ? `master-${album.masterId}` : `release-${album.id}`;
    const existing = seen.get(key);

    if (!existing) {
      seen.set(key, { ...album, pressingCount: 1 });
    } else {
      existing.pressingCount = (existing.pressingCount ?? 1) + 1;
    }
  }

  return Array.from(seen.values());
}

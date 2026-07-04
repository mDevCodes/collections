import { expect, test } from "vitest";
import dedupeByMaster from "./dedupeByMaster";
import { Album } from "@/schemas/collections.schemas";

function album(overrides: Partial<Album>): Album {
  return {
    id: 1,
    coverImage: "https://example.com/cover.jpg",
    albumTitle: "Some Album",
    artist: "Some Artist",
    formats: [],
    ...overrides,
  };
}

test("collapses multiple pressings sharing a master_id into one entry", () => {
  const albums = [
    album({ id: 1, masterId: 100, albumTitle: "Origin of Symmetry" }),
    album({ id: 2, masterId: 100, albumTitle: "Origin of Symmetry (Reissue)" }),
    album({ id: 3, masterId: 100, albumTitle: "Origin of Symmetry (Japan Pressing)" }),
  ];

  const deduped = dedupeByMaster(albums);

  expect(deduped).toHaveLength(1);
  expect(deduped[0].id).toBe(1);
  expect(deduped[0].pressingCount).toBe(3);
});

test("keeps releases with no master_id as their own separate entries", () => {
  const albums = [album({ id: 1 }), album({ id: 2 })];

  const deduped = dedupeByMaster(albums);

  expect(deduped).toHaveLength(2);
  expect(deduped.map((a) => a.pressingCount)).toStrictEqual([1, 1]);
});

test("preserves the order distinct albums first appear in", () => {
  const albums = [
    album({ id: 1, masterId: 200 }),
    album({ id: 2, masterId: 100 }),
    album({ id: 3, masterId: 200 }),
  ];

  const deduped = dedupeByMaster(albums);

  expect(deduped.map((a) => a.id)).toStrictEqual([1, 2]);
});

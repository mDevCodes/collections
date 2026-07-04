import { expect, test } from "vitest";
import rankSearchResults from "./rankSearchResults";
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

test("boosts an exact artist name match above incidental title matches", () => {
  const albums = [
    album({ id: 1, artist: "Amy Winehouse", albumTitle: "My Muse" }),
    album({ id: 2, artist: "Muse", albumTitle: "Origin of Symmetry" }),
    album({ id: 3, artist: "Some Tribute Band", albumTitle: "A Tribute to Muse" }),
  ];

  const ranked = rankSearchResults(albums, "Muse");

  expect(ranked.map((a) => a.id)).toStrictEqual([2, 1, 3]);
});

test("keeps original relative order for results with the same score", () => {
  const albums = [
    album({ id: 1, artist: "Muse", albumTitle: "Absolution" }),
    album({ id: 2, artist: "Muse", albumTitle: "Black Holes and Revelations" }),
  ];

  const ranked = rankSearchResults(albums, "Muse");

  expect(ranked.map((a) => a.id)).toStrictEqual([1, 2]);
});

test("is a no-op for an empty query", () => {
  const albums = [
    album({ id: 1, artist: "B Artist" }),
    album({ id: 2, artist: "A Artist" }),
  ];

  expect(rankSearchResults(albums, "")).toStrictEqual(albums);
});

test("matches artist names as whole words, not substrings", () => {
  const albums = [
    album({ id: 1, artist: "Amuse Bouche", albumTitle: "Some Album" }),
    album({ id: 2, artist: "Muse", albumTitle: "Showbiz" }),
  ];

  const ranked = rankSearchResults(albums, "Muse");

  expect(ranked.map((a) => a.id)).toStrictEqual([2, 1]);
});

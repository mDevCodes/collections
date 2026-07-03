import { expect, test } from "vitest";
import { DiscogsSearchResponseSchema } from "./discogs.schemas";

test("accepts a null master_id (release with no master group)", () => {
  const payload = {
    pagination: { page: 1, pages: 1 },
    results: [
      {
        id: 1,
        cover_image: "https://example.com/cover.jpg",
        title: "Muse - Showbiz",
        year: "1999",
        master_id: null,
        formats: [{ name: "Vinyl", qty: "1" }],
      },
    ],
  };

  expect(() => DiscogsSearchResponseSchema.parse(payload)).not.toThrow();
});

test("accepts a missing master_id field entirely", () => {
  const payload = {
    pagination: { page: 1, pages: 1 },
    results: [
      {
        id: 1,
        cover_image: "https://example.com/cover.jpg",
        title: "Muse - Showbiz",
        year: "1999",
        formats: [{ name: "Vinyl", qty: "1" }],
      },
    ],
  };

  expect(() => DiscogsSearchResponseSchema.parse(payload)).not.toThrow();
});

test("accepts a numeric master_id", () => {
  const payload = {
    pagination: { page: 1, pages: 1 },
    results: [
      {
        id: 1,
        cover_image: "https://example.com/cover.jpg",
        title: "Muse - Showbiz",
        year: "1999",
        master_id: 12345,
        formats: [{ name: "Vinyl", qty: "1" }],
      },
    ],
  };

  expect(() => DiscogsSearchResponseSchema.parse(payload)).not.toThrow();
});

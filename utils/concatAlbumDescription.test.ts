import { expect, test } from "vitest";
import concatAlbumDescription from "./concatAlbumDescription";

test("Render album description", () =>
  expect(
    concatAlbumDescription({
      id: 24,
      coverImage:
        "https://i.discogs.com/92zhjzfyi1nQWEgzFM6ly35vrFggCwhiP-7ZmPX2e8A/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1NTY4/ODU3LTE2NzU2MTg4/MTgtODg4Ni5wbmc.jpeg",
      albumTitle: "Tales Sound Team",
      artist: "Tales Of Symphonia - Original Video Game Soundtrack",
      year: "2022",
      formats: [
        {
          name: "Vinyl",
          qty: "3",
        },
        {
          name: "Vinyl",
          qty: "1",
        },
        {
          name: "Vinyl",
          qty: "1",
          descriptions: ["LP"],
        },
      ],
    })
  ).toEqual("Pink Marble Vinyl L, Green Marble Vinyl LP, Orange Vinyl LP"));

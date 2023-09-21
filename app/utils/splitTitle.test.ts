import { expect, test } from "vitest";
import splitTitle from "./splitTitle";

test("splits title into artist and album", () => {
  expect(splitTitle("Tame Impala - The Slow Rush")).toStrictEqual({
    artist: "Tame Impala",
    album: "The Slow Rush",
  });
});

import { expect, test } from "vitest";
import splitTitle from "./utils/splitTitle";

test("splits title into artist and album", () => {
  expect(splitTitle("Tame Impala - The Slow Rush")).toStrictEqual([
    "Tame Impala",
    "The Slow Rush",
  ]);
});

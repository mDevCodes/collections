import { expect, test } from "vitest";
import getFormatsDescription from "./getFormatsDescription";

test("Render album description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        text: "Pink Marble",
        descriptions: ["LP"],
      },
      {
        name: "Vinyl",
        qty: "1",
        text: "Green Marble",
        descriptions: ["LP"],
      },
      {
        name: "Vinyl",
        qty: "1",
        text: "Orange",
        descriptions: ["LP"],
      },
    ])
  ).toEqual("Pink Marble Vinyl LP"));

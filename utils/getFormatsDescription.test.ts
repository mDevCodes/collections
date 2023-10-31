import { expect, test } from "vitest";
import getFormatsDescription from "./getFormatsDescription";

test("Can get full formats description for result with only one format, quantity equal to 1, includes text, and one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        text: "Pink Marble",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP");
});

test("Can get full formats description for result with only one format, quantity greater than 1, includes text, and one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        text: "Pink Marble",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP (x2)");
});

test("Can get full formats description for result with only one format, quantity equal to 1, includes text, and more than one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        text: "Pink Marble",
        descriptions: ["LP", '12"'],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP (x2)");
});

test("Can get full formats description for result with only one format, quantity greater than 1, includes text, and more than one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        text: "Pink Marble",
        descriptions: ["LP", '12"'],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP 12 (x2)");
});

test("Can get full formats description for result with only one format, quantity equal to 1, includes text, and no descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        text: "Pink Marble",
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl");
});

test("Can get full formats description for result with only one format, quantity greater than 1, includes text, and no descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        text: "Pink Marble",
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl (x2)");
});

test("Can get full formats description for result with only one format, quantity equal to 1, does not include text, and one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Vinyl LP");
});

test("Can get full formats description for result with only one format, quantity greater than 1, does not include text, and one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Vinyl LP (x2)");
});

test("Can get full formats description for result with only one format, quantity equal to 1, does not include text, and more than one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        descriptions: ["LP", '12"'],
      },
    ])
  ).toStrictEqual("Vinyl LP 12");
});

test("Can get full formats description for result with only one format, quantity greater than 1, does not include text, and more than one item in descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        descriptions: ["LP", '12"'],
      },
    ])
  ).toStrictEqual("Vinyl LP 12 (x2)");
});

test("Can get full formats description for result with only one format, quantity equal to 1, and does not include text or descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
      },
    ])
  ).toStrictEqual("Vinyl");
});

test("Can get full formats description for result with only one format, quantity greater than 1, and does not include text or descriptions array", () => {
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
      },
    ])
  ).toStrictEqual("Vinyl (x2)");
});

// *only case to check for formats array with more than one object is that the results with qty=1 are rendering "(x1)"
test("Can get full formats description for result with more than one format, quantity equal to 1, includes text, and one item in descriptions array for each format", () => {
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
  ).toStrictEqual(
    "Pink Marble Vinyl LP (x1), Green Marble Vinyl LP (x2), Orange Vinyl LP (x1)"
  );
});

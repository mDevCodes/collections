import { expect, test } from "vitest";
import getFormatsDescription from "./getFormatsDescription";

// formats.length=1, qty=1, text, descriptions.length=1
test("Render album description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        text: "Pink Marble",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP"));

// formats.length=1, qty>1, text, descriptions.length=1
test("Render album description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        text: "Pink Marble",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP (x2)"));

// formats.length=1, qty=1, text, descriptions.length>1
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        text: "Pink Marble",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP (x2)"));

// formats.length=1, qty>1, text, descriptions.length>1
test("Render album description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        text: "Pink Marble",
        descriptions: ["LP", '12"'],
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl LP 12 (x2)"));

// formats.length=1, qty=1, text, descriptions=undefined
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        text: "Pink Marble",
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl"));

// formats.length=1, qty>1, text, descriptions=undefined
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        text: "Pink Marble",
      },
    ])
  ).toStrictEqual("Pink Marble Vinyl (x2)"));

// formats.length=1, qty=1, text=undefined, descriptions.length=1
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Vinyl LP"));

// formats.length=1, qty>1, text=undefined, descriptions.length=1
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        descriptions: ["LP"],
      },
    ])
  ).toStrictEqual("Vinyl LP (x2)"));

// formats.length=1, qty=1, text=undefined, descriptions.length>1
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
        descriptions: ["LP", '12"'],
      },
    ])
  ).toStrictEqual("Vinyl LP 12"));

// formats.length=1, qty>1, text=undefined, descriptions.length>1
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
        descriptions: ["LP", '12"'],
      },
    ])
  ).toStrictEqual("Vinyl LP 12 (x2)"));

// formats.length=1, qty=1, text=undefined, descriptions=undefined
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "1",
      },
    ])
  ).toStrictEqual("Vinyl"));

// formats.length=1, qty>1, text=undefined, descriptions=undefined
test("Get formats description", () =>
  expect(
    getFormatsDescription([
      {
        name: "Vinyl",
        qty: "2",
      },
    ])
  ).toStrictEqual("Vinyl (x2)"));

// formats.length>1, qty=1, text, descriptions.length=1
// *only case to check here is that the results with qty=1 are showing "(x1)"
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
        qty: "2",
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
  ));

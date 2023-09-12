const { describe, expect, test } = require("@jest/globals");
const { REF } = require("../utils.js");

describe("REF function", () => {
  test("REF works as expected", () => {
    expect(
      REF([
        [1, 1, 1],
        [0, 1, 1],
        [0, 0, 1],
      ])
    ).toStrictEqual([
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
    ]);
  });
});

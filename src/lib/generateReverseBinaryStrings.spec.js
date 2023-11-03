import { describe, it } from "mocha";
import assert from "assert";
import { generateReverseBinaryStrings } from "./utils.js";

describe("testing reverse binary string", () => {
  it("reverseBinaryStrings(1)", () => {
    assert.deepEqual(generateReverseBinaryStrings(1), [[0], [1]]);
  });

  it("reverseBinaryStrings(2)", () => {
    assert.deepEqual(generateReverseBinaryStrings(2), [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
  });

  it("reverseBinaryStrings(3)", () => {
    assert.deepEqual(generateReverseBinaryStrings(3), [
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ]);
  });

  it("reverseBinaryStrings(4)", () => {
    assert.deepEqual(generateReverseBinaryStrings(4), [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 1, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [1, 1, 0, 1],
      [0, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 1],
    ]);
  });
});

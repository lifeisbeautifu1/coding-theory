import { describe, it } from "mocha";
import assert from "assert";
import { generateBinaryWords } from "./utils.js";

describe("generateBinaryWords", () => {
  it("generateBinaryWords works as expected", () => {
    const array = [];
    generateBinaryWords([0, 0], 2, 0, array);
    assert.deepEqual(array, [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]);
    const secondArray = [];
    generateBinaryWords([0, 0, 0], 3, 0, secondArray);
    assert.deepEqual(secondArray, [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
    ]);
  });
});

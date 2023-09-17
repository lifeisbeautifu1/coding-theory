import { describe, it } from "mocha";
import assert from "assert";
import { matrixMul } from "./utils.js";

describe("matrixMul", () => {
  it("matrixMul works as expected", () => {
    assert.deepEqual(
      matrixMul(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [5, 6],
          [7, 8],
        ]
      ),
      [
        [1, 0],
        [1, 0],
      ]
    );
  });
});

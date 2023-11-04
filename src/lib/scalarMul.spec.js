import { describe, it } from "mocha";
import assert from "assert";
import { scalarMul } from "./utils.js";

describe("scalarMul", () => {
  it("scalarMul works as expected", () => {
    assert.deepEqual(
      scalarMul(
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0]
      ),
      0
    );

    assert.deepEqual(
      scalarMul(
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0]
      ),
      1
    );
  });
});

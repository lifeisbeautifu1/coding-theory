import { describe, it } from "mocha";
import assert from "assert";
import { RREF } from "./utils.js";

describe("RREF", () => {
  it("RREF works as expected", () => {
    console.log(
      RREF([
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [0, 1, 1, 1],
      ])
    );
    assert.deepEqual(
      RREF([
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [0, 1, 1, 1],
      ]),
      [
        [1, 0, 0, 0],
        [0, 1, 0, 1],
        [0, 0, 1, 0],
      ]
    );
  });
});

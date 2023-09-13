import assert from "assert";
import { REF } from "./utils.js";

describe("REF", () => {
  it("REF works as expected", () => {
    assert.deepEqual(
      [
        [1, 1, 1],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 1, 1],
        [0, 1, 1],
        [0, 0, 1],
      ]
    );
  });
});

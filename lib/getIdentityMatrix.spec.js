import { describe, it } from "mocha";
import assert from "assert";
import { getIdentityMatrix } from "./utils.js";

describe("getIdentityMatrix", () => {
  it("getIdentityMatrix works as expected", () => {
    assert.deepEqual(getIdentityMatrix(3), [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it("getIdentityMatrix works as expected 2", () => {
    assert.deepEqual(getIdentityMatrix(5), [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ]);
  });
});

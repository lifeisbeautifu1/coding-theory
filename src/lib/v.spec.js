import { describe, it } from "mocha";
import assert from "assert";
import { v } from "./utils.js";

describe("testing reverse binary string", () => {
  it("v(1, 3)", () => {
    assert.deepEqual(v(1, 3), [1, 0, 0]);
  });

  it("v(3, 4)", () => {
    assert.deepEqual(v(3, 4), [1, 1, 0, 0]);
  });
});

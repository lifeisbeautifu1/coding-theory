import { describe, it } from "mocha";
import assert from "assert";
import { generateG } from "./utils.js";

describe("generate G for Reed-Muller Code", () => {
  it("G(0, 1)", () => {
    assert.deepEqual(generateG(0, 1), [1, 1]);
  });

  it("G(1, 1)", () => {
    assert.deepEqual(generateG(1, 1), [
      [1, 1],
      [0, 1],
    ]);
  });

  it("G(0, 2)", () => {
    assert.deepEqual(generateG(0, 2), [1, 1, 1, 1]);
  });

  it("G(1, 2)", () => {
    assert.deepEqual(generateG(1, 2), [
      [1, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
    ]);
  });

  it("G(2, 2)", () => {
    assert.deepEqual(generateG(2, 2), [
      [1, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ]);
  });

  it("G(0, 3)", () => {
    assert.deepEqual(generateG(0, 3), [1, 1, 1, 1, 1, 1, 1, 1]);
  });

  it("G(1, 3)", () => {
    assert.deepEqual(generateG(1, 3), [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 1, 1, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
    ]);
  });
});

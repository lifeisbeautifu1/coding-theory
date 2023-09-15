import { describe, it } from "mocha";
import assert from "assert";
import { REF } from "./utils.js";

describe("REF", () => {
  it("REF works as expected", () => {
    assert.deepEqual(
      REF([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]),
      [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ]
    );
  });
  it("REF works as expected 2", () => {
    assert.deepEqual(
      REF([
        [1, 1, 1],
        [0, 1, 1],
        [1, 1, 0],
      ]),
      [
        [1, 1, 1],
        [0, 1, 1],
        [0, 0, 1],
      ]
    );
  });
  it("REF works as expected 3", () => {
    assert.deepEqual(
      REF([
        [0, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
      ]),
      [
        [1, 0, 0],
        [0, 1, 1],
        [0, 0, 0],
      ]
    );
  });
  it("REF works as expected 4", () => {
    assert.deepEqual(
      REF([
        [0, 0, 1, 1],
        [0, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 1, 0, 1],
        [0, 1, 0, 0],
      ]),
      [
        [0, 1, 1, 1],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    );
  });
  it("REF works as expected 5", () => {
    assert.deepEqual(
      REF([
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 1, 0, 0],
      ]),
      [
        [1, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
      ]
    );
  });
  it("REF works as expected 6", () => {
    assert.deepEqual(
      REF([
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1],
      ]),
      [
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
      ]
    );
  });
});

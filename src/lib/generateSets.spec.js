import { describe, it } from "mocha";
import assert from "assert";
import { generateSets } from "./utils.js";

describe("testing generateSets", () => {
  it("generateSets(4)", () => {
    assert.deepEqual(generateSets(4), [
      [],
      "3".split(""),
      "2".split(""),
      "1".split(""),
      "0".split(""),
      "23".split(""),
      "13".split(""),
      "03".split(""),
      "12".split(""),
      "02".split(""),
      "01".split(""),
      "123".split(""),
      "023".split(""),
      "013".split(""),
      "012".split(""),
    ]);
  });
});

import { describe, it } from "mocha";
import assert from "assert";
import { generateSets } from "./utils.js";

describe("testing generateSets", () => {
  it("generateSets(4)", () => {
    assert.deepEqual(generateSets(4), [
      "",
      "3",
      "2",
      "1",
      "0",
      "23",
      "13",
      "03",
      "12",
      "02",
      "01",
      "123",
      "023",
      "013",
      "012",
    ]);
  });
});

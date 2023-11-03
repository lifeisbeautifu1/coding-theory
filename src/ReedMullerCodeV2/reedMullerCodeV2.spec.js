import "colors";
import { describe, it } from "mocha";
import assert from "assert";
import ReedMullerCode from "./ReedMullerCodeV2.js";

describe("Reed-Muller V2 Code\n", () => {
  it(`5. Мажоритарное декодирование для кода Рида-
Маллера.`, () => {
    const r = 3;
    const m = 4;
    const code = new ReedMullerCode(r, m);

    console.log(`n: ${code.n}`.green.bold);
    console.log(`k: ${code.k}`.green.bold);
    console.log(`d: ${code.d}`.green.bold);

    console.log("Reed-Muller code G = ".green.bold);
    console.table(code.G);
  });
});

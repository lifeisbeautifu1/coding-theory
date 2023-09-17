import { describe, it } from "mocha";
import assert from "assert";
import { matrixMul, generateBinaryWords } from "../lib/index.js";
import LinearCode from "./LinearCode.js";

describe("LinearCode", () => {
  it("Testing LinearCode class from manual", () => {
    /**
     * 1.3 Создать класс линейных кодов LinearCode.
     */
    const linearCode = new LinearCode([
      [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    ]);
    /**
     * 1.3.1 На основе входной матрицы сформировать порождающую матрицу в ступенчатом * виде.
     */
    assert.deepEqual(linearCode.S, [
      [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    /**
     * 1.3.2 Задать n равное числу столбцов и k равное числу строк полученной матрицы * (без учёта полностью нулевых строк).
     */
    assert.strictEqual(linearCode.k, 5);
    assert.strictEqual(linearCode.n, 11);
    /**
     * 1.3.3 Сформировать проверочную матрицу на основе порождающей.
     */
    assert.deepEqual(linearCode.G, [
      [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    ]);
    /**
     * 1.3.3 Шаг 1. Сформировать матрицу 𝐆∗ в приведённом ступенчатом виде
     * на основе порождающей.
     */
    const G_TEST = linearCode.getTestMatrix();
    assert.deepEqual(G_TEST, [
      [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    ]);
    /**
     * 1.3.3 Шаг 2. Зафиксировать ведущие столбцы lead матрицы 𝐆∗.
     */
    assert.deepEqual(linearCode.getLeadColsIndexes(), [0, 3, 4, 6, 8]);
    /**
     * 1.3.3 Шаг 3. Сформировать сокращённую матрицу 𝐗, удалив ведущие
     * столбцы матрицы 𝐆∗.
     */
    const reducedG = linearCode.getReducedG();
    assert.deepEqual(reducedG, [
      [0, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 1, 1],
      [0, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1],
    ]);
    /**
     * 1.3.3 Шаг 4. Сформировать матрицу 𝐇, поместив в строки, соответствующие позициям ведущих столбцов строки из 𝐗, а в
остальные – строки единичной матрицы.
     */
    const H = linearCode.getH();
    assert.deepEqual(H, [
      [0, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 1],
      [0, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1],
    ]);
    /**
     * 1.4 Сформировать все кодовые слова длины n двумя способами.
     */
    /**
     * 1.4.1 Сложить все слова из порождающего множества, оставить неповторяющиеся.
     */
    // const allWords = linearCode.getWords();
    // console.table(allWords);
    /**
     * 1.4.2 Взять все двоичные слова длины k, умножить каждое на G.
     */
    const u = [[1, 0, 1, 1, 0]];
    const v = matrixMul(u, linearCode.G);
    assert.deepEqual(v, [[1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1]]);
    assert.deepEqual(matrixMul(v, H), [[0, 0, 0, 0, 0, 0]]);
    const binaryWords = [];
    generateBinaryWords(
      new Array(linearCode.k).fill(0),
      linearCode.k,
      0,
      binaryWords
    );
    const allWordsV2 = matrixMul(binaryWords, linearCode.G);
    console.table(allWordsV2);
    /**
     * 1.4 Вычислить кодовое расстояние получившегося кода.
     */
    let d = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < linearCode.G.length; ++i) {
      for (let j = i + 1; j < linearCode.G.length; ++j) {
        let difference = 0;
        linearCode.G[i].forEach((num, idx) => {
          if (num !== linearCode.G[j][idx]) {
            difference++;
          }
        });
        d = Math.min(d, difference);
      }
    }
    assert.strictEqual(d, 2);
    const t = d - 1;
    assert.strictEqual(t, 1);
    v[0][2] = (v[0][2] + 1) % 2;
    assert.deepEqual(matrixMul(v, H), [[0, 1, 0, 0, 0, 0]]);
    // v[0][2] = (v[0][2] + 1) % 2;
    // v[0][4] = (v[0][4] + 1) % 2;
    // v[0][7] = (v[0][7] + 1) % 2;
    // console.table(matrixMul(v, H));
    // assert.deepEqual(matrixMul(v, H), [[0, 0, 0, 0, 0, 0]]);
  });
});

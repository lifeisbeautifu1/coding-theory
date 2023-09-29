import { describe, it } from "mocha";
import assert from "assert";
import { getG, getGHardcoded, getH, getErrors } from "./SystematicCode.js";
import { matrixMul, sum, equals } from "../lib/index.js";

describe("Systematic Code", () => {
  it("Сформировать порождающую матрицу линейного кода (7, 4, 3)", () => {
    /**
     * 2.1. Сформировать порождающую матрицу линейного кода (7, 4, 3).
     */
    const n = 7;
    const k = 4;

    const GHardcoded = getGHardcoded();

    console.log("G:");
    console.table(GHardcoded);

    assert.deepEqual(GHardcoded, [
      [1, 0, 0, 0, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 0, 1, 1],
      [0, 0, 0, 1, 1, 1, 1],
    ]);

    /**
     * 2.2 Сформировать проверочную матрицу на основе порождающей.
     */
    const H = getH(n, k, GHardcoded);

    console.log("H:");
    console.table(H);

    assert.deepEqual(H, [
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);

    /**
     * 2.3 Сформировать таблицу синдромов для всех однократных ошибок.
     */
    let errors = getErrors(n, k);
    console.log("Errors:");
    console.table(errors);

    assert.deepEqual(errors, [
      [1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ]);

    const syndromes = matrixMul(errors, H);
    console.log("Синдромы: ");
    console.table(syndromes);

    const syndromeTable = {};

    syndromes.forEach((syndrome, index) => {
      syndromeTable[JSON.stringify([syndrome])] = [errors[index]];
    });

    console.log("Syndrome table");
    console.table(syndromeTable);

    /**
     * 2.4. Сформировать кодовое слово длины n из слова длины k. Внести однократную ошибку в сформированное слово. Вычислить синдром, исправить ошибку с использованием таблицы синдромов. Убедиться в правильности полученного слова.
     */
    const u = [[1, 0, 0, 1]];
    console.log("Исходное сообщение: ");
    console.table(u);

    let v = matrixMul(u, GHardcoded);
    console.log("Отправлено: ");
    console.table(v);

    let error = [[0, 0, 1, 0, 0, 0, 0]];

    console.log("Возникла ошибка: ");
    console.table(error);

    let w = sum(v, error);
    console.log("Принято: ");
    console.table(w);

    let syndrome = matrixMul(w, H);

    console.log("Синдром: ");
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибка: ");
    let calculatedError = syndromeTable[JSON.stringify(syndrome)];
    console.table(calculatedError);

    let corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение:");
    console.table(corrected);

    let decodedMessage = corrected.map((row) => row.slice(0, k));
    console.log("Декодированное сообщение: ");
    console.table(decodedMessage);

    assert.deepEqual(u, decodedMessage);

    /**
     * 2.5. Сформировать кодовое слово длины n из слова длины k. Внести двукратную ошибку в сформированное слово. Вычислить синдром, исправить ошибку с использованием таблицы синдромов. Убедиться, что полученное слово отличается от отправленного.
     */
    console.log("\nПример с двойной ошибкой:\n");

    console.log("Исходное сообщение: ");
    console.table(u);

    v = matrixMul(u, GHardcoded);
    console.log("Отправлено: ");
    console.table(v);

    error = [[1, 0, 0, 1, 0, 0, 0]];

    console.log("Возникла ошибка: ");
    console.table(error);

    w = sum(v, error);
    console.log("Принято: ");
    console.table(w);

    syndrome = matrixMul(w, H);

    console.log("Синдром: ");
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибки: ");
    const allSyndromes = Object.keys(syndromeTable).map((key) =>
      JSON.parse(key)
    );

    let firstError, secondError;
    for (let i = 0; i < k - 1; ++i) {
      for (let j = i + 1; j < k; ++j) {
        if (equals(sum(allSyndromes[i], allSyndromes[j]), syndrome)) {
          firstError = syndromeTable[JSON.stringify(allSyndromes[i])];
          console.table(firstError);
          secondError = syndromeTable[JSON.stringify(allSyndromes[j])];
          console.table(secondError);
        }
      }
    }

    console.log("Полная ошибка: ");
    calculatedError = sum(firstError, secondError);
    console.table(calculatedError);

    corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение:");
    console.table(corrected);

    decodedMessage = corrected.map((row) => row.slice(0, k));
    console.log("Декодированное сообщение: ");
    console.table(decodedMessage);

    assert.deepEqual(u, decodedMessage);
  });

  it("Сформировать порождающую матрицу линейного кода (n, k, 5)", () => {
    /* 2.6. Сформировать порождающую матрицу линейного кода (n, k, 5). */
    const n = 14;
    const k = 4;

    const G = getG(n, k);

    console.log("G");
    console.table(G);

    assert.deepEqual(G, [
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    ]);

    /* 2.7 Сформировать проверочную матрицу на основе порождающей. */
    const H = getH(n, k, G);

    console.log("H:");
    console.table(H);

    assert.deepEqual(H, [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    ]);

    /* 2.8 Сформировать таблицу синдромов для всех однократных и двукратных ошибок. */

    let errors = getErrors(n, k, true);
    console.log("Errors:");
    console.table(errors);

    assert.deepEqual(errors, [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    const syndromes = matrixMul(errors, H);
    console.log("Синдромы: ");
    console.table(syndromes);

    const syndromeTable = {};

    syndromes.forEach((syndrome, index) => {
      syndromeTable[JSON.stringify([syndrome])] = [errors[index]];
    });

    console.log("Syndrome table");
    console.table(syndromeTable);

    /**
     * 2.9. Сформировать кодовое слово длины n из слова длины k. Внести однократную ошибку в сформированное слово. Вычислить синдром, исправить ошибку с использованием таблицы синдромов. Убедиться в правильности полученного слова.
     */

    const u = [[1, 0, 0, 1]];
    console.log("Исходное сообщение: ");
    console.table(u);

    let v = matrixMul(u, G);
    console.log("Отправлено: ");
    console.table(v);

    let error = [[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    console.log("Возникла ошибка: ");
    console.table(error);

    let w = sum(v, error);
    console.log("Принято: ");
    console.table(w);

    let syndrome = matrixMul(w, H);

    console.log("Синдром: ");
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибка: ");
    let calculatedError = syndromeTable[JSON.stringify(syndrome)];
    console.table(calculatedError);

    let corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение:");
    console.table(corrected);

    let decodedMessage = corrected.map((row) => row.slice(0, k));
    console.log("Декодированное сообщение: ");
    console.table(decodedMessage);

    assert.deepEqual(u, decodedMessage);

    /**
     * 2.10. Сформировать кодовое слово длины n из слова длины k. Внести двукратную ошибку в сформированное слово. Вычислить синдром, исправить ошибку с использованием таблицы синдромов. Убедиться в правильности полученного слова.
     */

    console.log("\nПример с двойной ошибкой:\n");

    console.log("Исходное сообщение: ");
    console.table(u);

    v = matrixMul(u, G);
    console.log("Отправлено: ");
    console.table(v);

    error = [[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    console.log("Возникла ошибка: ");
    console.table(error);

    w = sum(v, error);
    console.log("Принято: ");
    console.table(w);

    syndrome = matrixMul(w, H);

    console.log("Синдром: ");
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибки: ");
    let allSyndromes = Object.keys(syndromeTable).map((key) => JSON.parse(key));

    let firstError, secondError;
    for (let i = 0; i < k - 1; ++i) {
      for (let j = i + 1; j < k; ++j) {
        if (equals(sum(allSyndromes[i], allSyndromes[j]), syndrome)) {
          firstError = syndromeTable[JSON.stringify(allSyndromes[i])];
          console.table(firstError);
          secondError = syndromeTable[JSON.stringify(allSyndromes[j])];
          console.table(secondError);
        }
      }
    }

    console.log("Полная ошибка: ");
    calculatedError = sum(firstError, secondError);
    console.table(calculatedError);

    corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение:");
    console.table(corrected);

    decodedMessage = corrected.map((row) => row.slice(0, k));
    console.log("Декодированное сообщение: ");
    console.table(decodedMessage);

    assert.deepEqual(u, decodedMessage);

    /**
     * 2.1. Сформировать кодовое слово длины n из слова длины k. Внести трёхкратную ошибку в сформированное слово. Вычислить синдром, исправить ошибку с использованием таблицы синдромов. Убедиться, что полученное слово отличается от отправленного.
     */

    console.log("\nПример с тройной ошибкой:\n");

    console.log("Исходное сообщение: ");
    console.table(u);

    v = matrixMul(u, G);
    console.log("Отправлено: ");
    console.table(v);

    error = [[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    console.log("Возникла ошибка: ");
    console.table(error);

    w = sum(v, error);
    console.log("Принято: ");
    console.table(w);

    syndrome = matrixMul(w, H);

    console.log("Синдром: ");
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибки: ");
    allSyndromes = Object.keys(syndromeTable).map((key) => JSON.parse(key));

    let thirdError;
    for (let i = 0; i < k - 2; ++i) {
      for (let j = i + 1; j < k - 1; ++j) {
        let total = sum(allSyndromes[i], allSyndromes[j]);
        for (let m = j + 1; m < k; ++m) {
          if (equals(sum(total, allSyndromes[m]), syndrome)) {
            firstError = syndromeTable[JSON.stringify(allSyndromes[i])];
            console.table(firstError);
            secondError = syndromeTable[JSON.stringify(allSyndromes[j])];
            console.table(secondError);
            thirdError = syndromeTable[JSON.stringify(allSyndromes[m])];
            console.table(thirdError);
          }
        }
      }
    }

    console.log("Полная ошибка: ");
    calculatedError = sum(sum(firstError, secondError), thirdError);
    console.table(calculatedError);

    corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение:");
    console.table(corrected);

    decodedMessage = corrected.map((row) => row.slice(0, k));
    console.log("Декодированное сообщение: ");
    console.table(decodedMessage);

    assert.deepEqual(u, decodedMessage);
  });
});

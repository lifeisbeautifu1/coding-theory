import "colors";
import { describe, it } from "mocha";
import assert from "assert";
import { matrixMul, sum, getErrors } from "../lib/index.js";
import HammingCode from "./HammingCode.js";

describe("Hamming Code\n", () => {
  it(`3.1 Написать функцию формирования порождающей и проверочной 
матриц кода Хэмминга (2^r - 1,2^r - r - 1,3) на основе параметра r, 
а также таблицы синдромов для всех однократных ошибок.`, () => {
    let r = 3;
    console.log(`r = ${r}\n`.yellow.bold);

    const code = new HammingCode(r);

    console.log("G: ".yellow.bold);
    console.table(code.G);
    console.log("H: ".yellow.bold);
    console.table(code.H);

    assert.deepEqual(code.G, [
      [1, 0, 0, 0, 1, 1, 1],
      [0, 1, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 1, 0, 1, 1],
    ]);

    assert.deepEqual(code.H, [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 1],
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);

    /**
     * Сформировать таблицу синдромов для всех однократных ошибок.
     */
    let errors = getErrors(code.n);
    console.log("Errors: ".yellow.bold);
    console.table(errors);

    assert.deepEqual(errors, [
      [1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1],
    ]);

    let syndromes = matrixMul(errors, code.H);
    console.log("Синдромы: ");
    console.table(syndromes);

    let syndromeTable = {};

    syndromes.forEach((syndrome, index) => {
      syndromeTable[JSON.stringify([syndrome])] = [errors[index]];
    });

    console.log("Syndrome table");
    console.table(syndromeTable);

    /**
     * 3.2. Провести  исследование  кода  Хэмминга  для  одно-,  двух- и 
трёхкратных ошибок для r = 2, 3, 4.
     */
    let u = [[1, 0, 0, 1]];
    console.log("Исходное сообщение: ".yellow.bold);
    console.table(u);

    let v = matrixMul(u, code.G);
    console.log("Отправлено: ".yellow.bold);
    console.table(v);

    let error = [[0, 0, 1, 0, 0, 0, 0]];

    console.log("Возникла ошибка: ".yellow.bold);
    console.table(error);

    let w = sum(v, error);
    console.log("Принято: ".yellow.bold);
    console.table(w);

    let syndrome = matrixMul(w, code.H);

    console.log("Синдром: ".yellow.bold);
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибка: ".yellow.bold);
    let calculatedError = syndromeTable[JSON.stringify(syndrome)];
    console.table(calculatedError);

    let corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение: ".yellow.bold);
    console.table(corrected);

    let decodedMessage = corrected.map((row) => row.slice(0, code.k));
    console.log("Декодированное сообщение: ".yellow.bold);
    console.table(decodedMessage);

    assert.deepEqual(u, decodedMessage);

    /**
     * Двойная ошибка
     */
    console.log("Двойная ошибка".yellow.bold);
    console.log("Исходное сообщение: ".yellow.bold);
    console.table(u);

    v = matrixMul(u, code.G);
    console.log("Отправлено: ".yellow.bold);
    console.table(v);

    error = [[0, 1, 0, 0, 0, 1, 0]];

    console.log("Возникла ошибка: ".yellow.bold);
    console.table(error);

    w = sum(v, error);
    console.log("Принято: ".yellow.bold);
    console.table(w);

    syndrome = matrixMul(w, code.H);

    console.log("Синдром: ".yellow.bold);
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибка: ".yellow.bold);
    calculatedError = syndromeTable[JSON.stringify(syndrome)];
    console.table(calculatedError);

    corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение: ".yellow.bold);
    console.table(corrected);

    decodedMessage = corrected.map((row) => row.slice(0, code.k));
    console.log("Декодированное сообщение: ".yellow.bold);
    console.table(decodedMessage);

    console.log(
      "Обнаружили двойную ошибку, но исправить не можем!\n".yellow.bold
    );

    /**
     * Тройная ошибка
     */
    console.log("Тройная ошибка".yellow.bold);
    console.log("Исходное сообщение: ".yellow.bold);
    console.table(u);

    v = matrixMul(u, code.G);
    console.log("Отправлено: ".yellow.bold);
    console.table(v);

    error = [[0, 1, 1, 0, 0, 1, 0]];

    console.log("Возникла ошибка: ".yellow.bold);
    console.table(error);

    w = sum(v, error);
    console.log("Принято: ".yellow.bold);
    console.table(w);

    syndrome = matrixMul(w, code.H);

    console.log("Синдром: ".yellow.bold);
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибка: ".yellow.bold);
    calculatedError = syndromeTable[JSON.stringify(syndrome)];
    console.table(calculatedError);

    corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение: ".yellow.bold);
    console.table(corrected);

    decodedMessage = corrected.map((row) => row.slice(0, code.k));
    console.log("Декодированное сообщение: ".yellow.bold);
    console.table(decodedMessage);

    console.log("Обнаружили тройную ошибку, но исправить не можем!");

    r = 4;
    console.log(`r = ${r}\n`.yellow.bold);

    const biggerCode = new HammingCode(r);

    console.log("G: ".yellow.bold);
    console.table(biggerCode.G);
    console.log("H: ".yellow.bold);
    console.table(biggerCode.H);

    assert.deepEqual(biggerCode.G, [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    ]);

    assert.deepEqual(biggerCode.H, [
      [1, 1, 1, 1],
      [1, 1, 1, 0],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 1],
      [0, 1, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);

    errors = getErrors(biggerCode.n);
    console.log("Errors: ".yellow.bold);
    console.table(errors);

    syndromes = matrixMul(errors, biggerCode.H);
    console.log("Синдромы: ");
    console.table(syndromes);

    syndromeTable = {};

    syndromes.forEach((syndrome, index) => {
      syndromeTable[JSON.stringify([syndrome])] = [errors[index]];
    });

    console.log("Syndrome table");
    console.table(syndromeTable);

    u = [[1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0]];
    console.log("Исходное сообщение: ".yellow.bold);
    console.table(u);

    v = matrixMul(u, biggerCode.G);
    console.log("Отправлено: ".yellow.bold);
    console.table(v);

    error = [[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    console.log("Возникла ошибка: ".yellow.bold);
    console.table(error);

    w = sum(v, error);
    console.log("Принято: ".yellow.bold);
    console.table(w);

    syndrome = matrixMul(w, biggerCode.H);

    console.log("Синдром: ".yellow.bold);
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибка: ".yellow.bold);
    calculatedError = syndromeTable[JSON.stringify(syndrome)];
    console.table(calculatedError);

    corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение: ".yellow.bold);
    console.table(corrected);

    decodedMessage = corrected.map((row) => row.slice(0, biggerCode.k));
    console.log("Декодированное сообщение: ".yellow.bold);
    console.table(decodedMessage);

    assert.deepEqual(u, decodedMessage);

    /**
     * Двойная ошибка
     */
    console.log("Двойная ошибка".yellow.bold);
    console.log("Исходное сообщение: ".yellow.bold);
    console.table(u);

    v = matrixMul(u, biggerCode.G);
    console.log("Отправлено: ".yellow.bold);
    console.table(v);

    error = [[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]];

    console.log("Возникла ошибка: ".yellow.bold);
    console.table(error);

    w = sum(v, error);
    console.log("Принято: ".yellow.bold);
    console.table(w);

    syndrome = matrixMul(w, biggerCode.H);

    console.log("Синдром: ".yellow.bold);
    console.table(syndrome);

    console.log("Синдрому соответсвует ошибка: ".yellow.bold);
    calculatedError = syndromeTable[JSON.stringify(syndrome)];
    console.table(calculatedError);

    corrected = sum(w, calculatedError);

    console.log("Исправленное сообщение: ".yellow.bold);
    console.table(corrected);

    decodedMessage = corrected.map((row) => row.slice(0, biggerCode.k));
    console.log("Декодированное сообщение: ".yellow.bold);
    console.table(decodedMessage);

    console.log(
      "Обнаружили двойную ошибку, но исправить не можем!\n".yellow.bold
    );
  });
});

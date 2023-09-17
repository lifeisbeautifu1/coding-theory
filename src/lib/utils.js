/**
 * Reduces matrix to echelon form
 * @params matrix
 * @returns echelon matrix
 * @example [[1, 1, 1],    [[1, 1, 1],
 *           [1, 1, 1], ->  [0, 0, 0],
 *           [1, 1, 1]]     [0, 0, 0]]
 * @example [[1, 1, 1],    [[1, 1, 1],
 *           [0, 1, 1], ->  [0, 1, 1],
 *           [1, 1, 0]]     [0, 0, 1]]
 */
export function REF(matrix) {
  const copy = matrix.map((row) => [...row]);
  const cols = matrix[0].length;
  const rows = matrix.length;
  let index = 0;
  for (let j = 0; j < cols; ++j) {
    let rowWithLeadingOne = -1;
    for (let i = index; i < rows; ++i) {
      if (copy[i][j] === 1) {
        rowWithLeadingOne = i;
        break;
      }
    }
    if (rowWithLeadingOne === -1) {
      continue;
    } else {
      const tmp = copy[index];
      copy[index] = copy[rowWithLeadingOne];
      copy[rowWithLeadingOne] = tmp;
      for (let i = index + 1; i < rows; ++i) {
        if (copy[i][j] === 1) {
          copy[i] = copy[i].map((num, k) => (num + copy[index][k]) % 2);
        }
      }
      index++;
    }
  }
  return copy;
}

/**
 * Reduces matrix to different echelon form
 * @params matrix
 * @returns echelon matrix
 * @example [[1, 1, 1, 1],   [[1, 0, 0, 0],
 *           [1, 0, 1, 0], -> [0, 1, 0, 1],
 *           [0, 1, 1, 1]]    [0, 0, 1, 0]]
 */
export function RREF(matrix) {
  const copy = matrix.map((row) => [...row]);
  const cols = matrix[0].length;
  const rows = matrix.length;
  let index = 0;
  for (let j = 0; j < cols; ++j) {
    let rowWithLeadingOne = -1;
    for (let i = index; i < rows; ++i) {
      if (copy[i][j] === 1) {
        rowWithLeadingOne = i;
        break;
      }
    }
    if (rowWithLeadingOne === -1) {
      continue;
    } else {
      const tmp = copy[index];
      copy[index] = copy[rowWithLeadingOne];
      copy[rowWithLeadingOne] = tmp;
      for (let i = 0; i < rows; ++i) {
        if (copy[i][j] === 1 && i !== index) {
          copy[i] = copy[i].map((num, k) => (num + copy[index][k]) % 2);
        }
      }
      index++;
    }
  }
  return copy;
}

/**
 * Returns identity matrix of size (N, N)
 * @param {*} n matrix size
 * @returns idenity matrix
 * @example
 *                         [[1, 0, 0],
 *  getIdentityMatrix() ->  [0, 1, 0],
 *                          [0, 0, 1]]
 */
export function getIdentityMatrix(n) {
  const identity = [];
  for (let i = 0; i < n; ++i) {
    const arr = new Array(n).fill(0);
    arr[i] = 1;
    identity.push(arr);
  }
  return identity;
}

/**
 * Matrix multiplication helper function
 * @param {*} first matrix1
 * @param {*} second matrix2
 * @returns matrix1 @ matrix2
 */
export function matrixMul(matrix1, matrix2) {
  if (matrix1[0].length !== matrix2.length) {
    throw new Error(
      `Inner sizes doesn't match (${matrix1.length}, ${matrix1[0].length}) x (${matrix2.length}, ${matrix2[0].length})`
    );
  }
  const res = [];
  for (let i = 0; i < matrix1.length; ++i) {
    const arr = [];
    for (let j = 0; j < matrix2[0].length; ++j) {
      let num = 0;
      for (let k = 0; k < matrix1[0].length; ++k) {
        num = (num + matrix1[i][k] * matrix2[k][j]) % 2;
      }
      arr.push(num);
    }
    res.push(arr);
  }
  return res;
}

/**
 * Generates binary strings
 * @param {*} arr
 * @param {*} size
 * @param {*} i
 * @param {*} fullArray
 * @returns
 */
export function generateBinaryWords(arr, size, i, fullArray) {
  if (i === size) {
    fullArray.push([...arr]);
    return;
  }
  arr[i] = 0;
  generateBinaryWords(arr, size, i + 1, fullArray);
  arr[i] = 1;
  generateBinaryWords(arr, size, i + 1, fullArray);
}

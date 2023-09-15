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

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
function REF(matrix) {
  // TODO: do the thing...
  const copy = matrix.map((row) => [...row]);
  return matrix;
}

/**
 * some function description here
 * @params matrix
 * @returns echelon matrix
 */
function RREF(matrix) {
  // TODO: do the thing...
  return matrix;
}

module.exports = {
  REF,
  RREF,
};

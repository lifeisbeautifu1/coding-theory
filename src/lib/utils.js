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
export function matrixMul(matrix1, matrix2, binary = true) {
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
        num = num + matrix1[i][k] * matrix2[k][j];
        if (binary) {
          num %= 2;
        }
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

export function containsOneOnes(arr) {
  let flag = false;
  for (let i = 0; i < arr.length; ++i) {
    if (flag && arr[i] === 1) {
      return false;
    } else if (arr[i] === 1) {
      flag = true;
    }
  }
  return flag;
}

export function getErrors(n) {
  return new Array(n)
    .fill(0)
    .map((row, rowIndex) =>
      new Array(n)
        .fill(0)
        .map((num, colIndex) => (rowIndex === colIndex ? 1 : 0))
    );
}

export function sum(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error("Sizes doesnt match");
  }
  return A.map((row, rowIndex) =>
    row.map((num, colIndex) => (num + B[rowIndex][colIndex]) % 2)
  );
}

export function equals(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error("Sizes doesnt match");
  }
  let flag = true;
  A.forEach((row, rowIndex) =>
    row.forEach((num, colIndex) => {
      if (num !== B[rowIndex][colIndex]) {
        flag = false;
      }
    })
  );
  return flag;
}

export function wt(s) {
  return s[0].reduce((acc, item) => acc + item, 0);
}

export function factorial(n) {
  if (n === 0) {
    return 1;
  }
  let res = 1;
  for (let i = 2; i <= n; ++i) {
    res *= i;
  }
  return res;
}

export function C(k, m) {
  return factorial(m) / (factorial(m - k) * factorial(k));
}

export const B = [
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1],
  [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

export function isNested(array) {
  for (let i = 0; i < array.length; ++i) {
    if (Array.isArray(array[i])) return true;
  }
  return false;
}

export function generateG(r, m) {
  if (r === 0) {
    return new Array(2 ** m).fill(1);
  } else if (r === m) {
    const prev = generateG(m - 1, m);
    return [
      ...(isNested(prev) ? prev : [prev]),
      new Array(2 ** m)
        .fill(0)
        .map((num, index) => (index === 2 ** m - 1 ? 1 : num)),
    ];
  } else {
    let firstRow = generateG(r, m - 1);
    firstRow = firstRow.map((row) => row.concat(row));
    return [
      ...firstRow,
      new Array(2 ** (m - 1)).fill(0).concat(generateG(r - 1, m - 1)),
    ];
  }
}

export function isPowerOfTwo(x) {
  return (x & (x - 1)) == 0;
}

export function v(j, m) {
  const bits = new Array(m).fill(0);
  let currJ = j;
  return bits.reduceRight((acc, _, index) => {
    if (2 ** (m - (index + 1)) <= currJ) {
      currJ -= 2 ** (m - (index + 1));
      return [...acc, 1];
    } else {
      return [...acc, 0];
    }
  }, []);
}

export function generateReverseBinaryStrings(m) {
  const res = [];

  generateBinaryWords(new Array(m).fill(0), m, 0, res);

  return res.map((row) => row.reverse());
}

export function generateSets(m) {
  let res = generateReverseBinaryStrings(m);

  res.pop();

  res = res.map((row) =>
    row.reduce((acc, item, index) => (item ? `${acc}${index}` : acc), "")
  );

  res = res.sort((a, b) => {
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    for (let i = a.length - 1; i >= 0; --i) {
      if (a[i] !== b[i]) {
        return b[i] - a[i];
      }
    }
  });

  console.log("Our v sets are: ".green.bold);
  console.table(res);

  return res.map((str) => (str ? str.split("").map((num) => +num) : []));
}

export function f(set, nums) {
  if (set.length === 0) {
    return 1;
  }
  let amount = 1;
  set.forEach((num) => (amount *= (nums[num] + 1) % 2));
  return amount;
}

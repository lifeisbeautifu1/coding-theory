/* 2.6. Сформировать порождающую матрицу линейного кода (n, k, 5). */
export function getG(n, k) {
  let G = new Array(k).fill(0).reduce((acc) => {
    return [...acc, new Array(n).fill(0)];
  }, []);

  G = G.map((row, rowIndex) =>
    row.map((_, colIndex) => (rowIndex === colIndex && colIndex < k ? 1 : 0))
  );

  G = G.map((row, rowIndex) =>
    row.map((num, colIndex) => {
      const indexes = new Array(k).fill(0).map((_, idx) => k + idx);
      if (indexes.includes(colIndex - rowIndex * 2)) {
        return 1;
      }
      return num;
    })
  );

  return G;
}

/* 2.1. Сформировать порождающую матрицу линейного кода (7, 4, 3). */
export function getGHardcoded() {
  const n = 7;
  const k = 4;

  let G = new Array(k).fill(0).reduce((acc) => {
    return [...acc, new Array(n).fill(0)];
  }, []);

  G = G.map((row, rowIndex) =>
    row.map((_, colIndex) => (rowIndex === colIndex && colIndex < k ? 1 : 0))
  );

  const indexes = [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 1, 2],
  ];

  G = G.map((row, rowIndex) =>
    row.map((num, colIndex) =>
      indexes[rowIndex].includes(colIndex - k) ? 1 : num
    )
  );

  return G;
}

export function getH(n, k, G) {
  let H = new Array(n).fill(0).reduce((acc) => {
    return [...acc, new Array(n - k).fill(0)];
  }, []);

  return H.map((row, rowIndex) =>
    rowIndex < k
      ? G[rowIndex].slice(k)
      : row.map((num, numIndex) => (rowIndex - k === numIndex ? 1 : 0))
  );
}

export function getErrors(n = 7, k = 4, double = false) {
  const res = [];
  for (let i = 0; i < n; ++i) {
    let arr = new Array(n).fill(0);
    arr[i] = 1;
    res.push(arr);
  }
  if (double) {
    for (let i = 0; i < n - 1; ++i) {
      let arr = new Array(n).fill(0);
      arr[i] = 1;
      let flag = false;
      for (let j = i + 1; j < n; ++j) {
        if (flag) {
          arr = new Array(n).fill(0);
          arr[i] = 1;
          arr[j] = 1;
          res.push(arr);
        } else {
          arr[j] = 1;
          res.push(arr);
          flag = true;
        }
      }
    }
  }
  return res;
}

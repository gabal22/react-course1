export const average = (arr) =>
  Number(arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2));
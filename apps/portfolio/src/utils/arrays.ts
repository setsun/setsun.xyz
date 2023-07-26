export function avg(arr: number[]) {
  let total = arr.reduce(function (sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

export function max(arr: number[]) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

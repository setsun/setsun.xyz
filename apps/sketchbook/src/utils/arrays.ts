export function avg(arr: number[]) {
  const total = arr.reduce(function (sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

export function max(arr: number[]) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

export function sample(arr: number[]) {
  const length = arr == null ? 0 : arr.length;
  return length ? arr[Math.floor(Math.random() * length)] : undefined;
}

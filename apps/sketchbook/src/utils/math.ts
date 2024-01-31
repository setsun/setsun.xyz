export function fractionate(val: number, minVal: number, maxVal: number) {
  return (val - minVal) / (maxVal - minVal);
}

export function modulate(
  val: number,
  minVal: number,
  maxVal: number,
  outMin: number,
  outMax: number,
) {
  const fr = fractionate(val, minVal, maxVal);
  const delta = outMax - outMin;
  return outMin + fr * delta;
}

export function clamp(number: number, lower: number, upper: number) {
  number = +number;
  lower = +lower;
  upper = +upper;
  lower = lower === lower ? lower : 0;
  upper = upper === upper ? upper : 0;
  if (number === number) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
  }
  return number;
}

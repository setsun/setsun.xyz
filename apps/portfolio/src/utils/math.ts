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
  let fr = fractionate(val, minVal, maxVal);
  let delta = outMax - outMin;
  return outMin + fr * delta;
}

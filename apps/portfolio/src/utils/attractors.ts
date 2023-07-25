import * as random from "maath/random";
import { Vector3, Vector3Tuple } from "three";

export function createAttractor(length: number, start?: number[]) {
  const positions = [];

  const p = start ? start : random.onSphere(new Float32Array(length * 3));

  for (let i = 0; i < length; i++) {
    positions.push(new Vector3().fromArray(p, i * 3));
  }

  const currentPosition = new Vector3().fromArray(p);

  return { positions, currentPosition };
}

export function updateAttractor(
  currentPosition: Vector3,
  scale: number,
  simulation: Function,
  timeStep: number,
) {
  const [dx, dy, dz] = simulation(currentPosition.toArray(), timeStep);

  currentPosition.add(new Vector3(dx, dy, dz));

  const normalizedPosition = currentPosition
    .clone()
    .normalize()
    .multiplyScalar(scale);

  return normalizedPosition;
}

/**
 * Different attractor types
 * https://fusefactory.github.io/openfuse/strange%20attractors/particle%20system/Strange-Attractors-GPU/
 */
export function dadrasAttractor([x, y, z]: Vector3Tuple, timestep: number) {
  const a = 3;
  const b = 2.7;
  const c = 1.7;
  const d = 2;
  const e = 9;

  const dx = (y - a * x + b * y * z) * timestep;
  const dy = (c * y - x * z + z) * timestep;
  const dz = (d * x * y - e * z) * timestep;

  return [dx, dy, dz];
}

export function aizawaAttractor([x, y, z]: Vector3Tuple, timestep: number) {
  const a = 0.95;
  const b = 0.7;
  const c = 0.6;
  const d = 3.5;
  const e = 0.1;

  const dx = ((z - b) * x - d * y) * timestep;
  const dy = (d * x + (z - b) * y) * timestep;
  const dz =
    (c + a * z - (z * z * z) / 3 - x * x + e * z * (x * x * x)) * timestep;

  return [dx, dy, dz];
}

export function arneodoAttractor([x, y, z]: Vector3Tuple, timestep: number) {
  const a = -5.5;
  const b = 3.5;
  const d = -1;

  const dx = y * timestep;
  const dy = z * timestep;
  const dz = (-a * x - b * y - z + d * Math.pow(x, 3)) * timestep;

  return [dx, dy, dz];
}

export function dequanAttractor([x, y, z]: Vector3Tuple, timestep: number) {
  const a = 40.0;
  const b = 1.833;
  const c = 0.16;
  const d = 0.65;
  const e = 55.0;
  const f = 20.0;

  const dx = (a * (y - x) + c * x * z) * timestep;
  const dy = (e * x + f * y - x * z) * timestep;
  const dz = (b * z + x * y - d * x * x) * timestep;

  return [dx, dy, dz];
}

export function lorenzAttractor([x, y, z]: Vector3Tuple, timestep: number) {
  const beta = 8 / 3;
  const rho = 28;
  const sigma = 10;

  const dx = sigma * (y - x) * timestep;
  const dy = (x * (rho - z) - y) * timestep;
  const dz = (x * y - beta * z) * timestep;

  return [dx, dy, dz];
}

export function lorenzMod2Attractor([x, y, z]: Vector3Tuple, timestep: number) {
  const a = 0.9;
  const b = 5.0;
  const c = 9.9;
  const d = 1.0;

  const dx = (-a * x + y * y - z * z + a * c) * timestep;
  const dy = (x * (y - b * z) + d) * timestep;
  const dz = (-z + x * (b * y + z)) * timestep;

  return [dx, dy, dz];
}

export function threeScrollUnifiedChaoticSystemAttractor(
  [x, y, z]: Vector3Tuple,
  timestep: number,
) {
  const a = 40;
  const b = 0.833;
  const c = 20;
  const d = 0.5;
  const e = 0.65;

  const dx = (a * (y - x) + d * x * z) * timestep * 0.1;
  const dy = (c * y - x * z) * timestep * 0.1;
  const dz = (b * z + x * y - e * x * x) * timestep * 0.1;

  return [dx, dy, dz];
}

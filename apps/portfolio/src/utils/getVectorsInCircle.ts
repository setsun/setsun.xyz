import { Vector3 } from "three";

/**
 * Based on a set of values passed in, generate a set of points around the z-axis.
 */
export const getVectorsInCircle = (
  values: number[],
  radius: number,
  modifier: number,
): Vector3[] => {
  // todo: why dis work tho 🤷🏻‍♂️
  return [...values, 0].map((value, index) => {
    const theta = (index / values.length) * Math.PI * 2;
    const outerRadius = radius + value * modifier;

    const x = Math.cos(theta) * outerRadius;
    const y = Math.sin(theta) * outerRadius;

    return new Vector3(x, y, 0);
  });
};

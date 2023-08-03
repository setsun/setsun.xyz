import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  InterleavedBufferAttribute,
  Vector3,
} from "three";

/**
 * Based on a set of values passed in, generate a set of points around the z-axis.
 */
export function getVectorsInCircle(
  values: number[],
  radius: number,
  modifier: number,
): Vector3[] {
  // todo: why dis work tho 🤷🏻‍♂️
  return [...values, 0].map((value, index) => {
    const theta = (index / values.length) * Math.PI * 2;
    const outerRadius = radius + value * modifier;

    const x = Math.cos(theta) * outerRadius;
    const y = Math.sin(theta) * outerRadius;

    return new Vector3(x, y, 0);
  });
}

export function updateGeometryVertices(
  geometry: BufferGeometry,
  onUpdate: (
    currentVertex: Vector3,
    positionAttribute: BufferAttribute | InterleavedBufferAttribute,
    index: number,
  ) => void,
) {
  const positionAttribute = geometry.getAttribute("position");

  const currentVertex = new Vector3();

  for (let i = 0; i < positionAttribute.count; i++) {
    // read in data for the current vertex
    currentVertex.fromBufferAttribute(positionAttribute, i);

    onUpdate(currentVertex, positionAttribute, i);
  }

  positionAttribute.needsUpdate = true;
}

export function getCanvasImageData(imageSrc: string) {
  return new Promise<ImageData>((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      // create a temporary canvas element to draw to, so we can get the image data from it
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;

      if (!ctx) {
        return reject("Canvas context not found");
      }

      ctx.scale(1, -1); // flip y
      ctx.drawImage(image, 0, 0, image.width, -image.height);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      return resolve(imageData);
    };
  });
}

export function getLogarithmicCurve({
  linearCoefficient = 5,
  logarithmicCoefficient = 0.01,
  zScale = 1,
  mirror,
}: {
  linearCoefficient: number;
  logarithmicCoefficient: number;
  zScale: number;
  mirror?: boolean;
}) {
  const points = [];

  // if we are mirroring the curve, we need to generate the points in reverse order
  if (mirror) {
    for (let i = 100; i >= 0; i -= 0.05) {
      const x =
        linearCoefficient *
        Math.pow(Math.E, logarithmicCoefficient * i) *
        Math.cos(+i) *
        -1;

      const y =
        linearCoefficient *
        Math.pow(Math.E, logarithmicCoefficient * i) *
        Math.sin(+i) *
        -1;

      const z = -(i * zScale);

      points.push(new Vector3(x, y, z));
    }
  }

  for (let i = 0; i <= 100; i += 0.05) {
    const x =
      linearCoefficient *
      Math.pow(Math.E, logarithmicCoefficient * i) *
      Math.cos(+i);

    const y =
      linearCoefficient *
      Math.pow(Math.E, logarithmicCoefficient * i) *
      Math.sin(+i);

    const z = i * zScale;

    points.push(new Vector3(x, y, z));
  }

  const curve = new CatmullRomCurve3(points).getPoints(5000);

  return curve;
}

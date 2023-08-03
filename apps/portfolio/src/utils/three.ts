import {
  BufferAttribute,
  BufferGeometry,
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

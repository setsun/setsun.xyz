import {
  BufferAttribute,
  BufferGeometry,
  InterleavedBufferAttribute,
  Vector3,
} from "three";

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

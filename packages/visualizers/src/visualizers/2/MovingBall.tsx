import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { Mesh, AudioAnalyser } from "three";
import { updateGeometryVertices } from "../../utils/updateGeometryVertices";
interface Props {
  radius?: number;
  detail?: number;
  amplitude?: number;
  audioAnalyzer: AudioAnalyser;
}

const noise3D = createNoise3D();

function fractionate(val: number, minVal: number, maxVal: number) {
  return (val - minVal) / (maxVal - minVal);
}

function modulate(
  val: number,
  minVal: number,
  maxVal: number,
  outMin: number,
  outMax: number
) {
  let fr = fractionate(val, minVal, maxVal);
  let delta = outMax - outMin;
  return outMin + fr * delta;
}

function avg(arr: number[]) {
  let total = arr.reduce(function (sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

function max(arr: number[]) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

const MovingBall = ({
  radius = 1,
  detail = 1,
  amplitude = 10,
  audioAnalyzer,
}: Props) => {
  const mesh = useRef<Mesh>(null!);

  useFrame(() => {
    const values = Array.from(audioAnalyzer.getFrequencyData());

    const lowerHalfArray = values.slice(0, values.length / 2 - 1);
    const upperHalfArray = values.slice(
      values.length / 2 - 1,
      values.length - 1
    );
    let lowerMax = max(lowerHalfArray);
    let upperAvg = avg(upperHalfArray);

    let lowerMaxFr = lowerMax / lowerHalfArray.length;
    let upperAvgFr = upperAvg / upperHalfArray.length;

    const baseFr = modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8);
    const topFr = modulate(upperAvgFr, 0, 1, 0, 4);

    const geometry = mesh.current.geometry;

    updateGeometryVertices(geometry, (vertex, positionAttribute, index) => {
      const offset = 150;
      const time = window.performance.now();
      vertex.normalize();

      const rf = 0.00001;

      const distance =
        offset +
        baseFr +
        noise3D(
          vertex.x + time * rf * 7,
          vertex.y + time * rf * 8,
          vertex.z + time * rf * 9
        ) *
          amplitude *
          topFr;

      vertex.multiplyScalar(distance);

      positionAttribute.setXYZ(index, vertex.x, vertex.y, vertex.z); // write coordinates back
    });

    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={mesh}>
      <dodecahedronGeometry args={[radius, detail]} />
      <meshBasicMaterial attach="material" color="#fff" wireframe />
    </mesh>
  );
};

export default MovingBall;

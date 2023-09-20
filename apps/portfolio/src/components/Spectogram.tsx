import { useFrame } from "@react-three/fiber";
import colormap from "colormap";
import { useEffect, useMemo, useRef } from "react";
import {
  AudioAnalyser,
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  Uint8BufferAttribute,
  Vector3,
} from "three";

// 1. Compute the number of vertices needed, given the frequency and time (seconds) required
// 2. Create Grid geometry (plane that has vertices)

const colorShades = 256;

const vertexShader = `
  attribute float displacement;

  uniform vec3 v_lut[${colorShades}];

  varying vec3 v_color;

  void main(){
    int index = int(displacement);
    v_color = v_lut[index];
    vec3 newPosition = position + normal * displacement / 15.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
  }
`;

const fragmentShader = `
  varying vec3 v_color;

  void main(){
    gl_FragColor = vec4(v_color, 1.0);
  }
`;

interface Props {
  audioAnalyser: AudioAnalyser;
  frequencySamples: number;
  timeSamples: number;
}

function createGridGeometry(
  frequencySamples: number,
  timeSamples: number,
  xSize = 128,
  ySize = 48,
) {
  const nVertices = (frequencySamples + 1) * (timeSamples + 1);
  let xSegments = timeSamples;
  let ySegments = frequencySamples;
  let xHalfSize = xSize / 2;
  let yHalfSize = ySize / 2;
  let xSegmentSize = xSize / xSegments;
  let ySegmentSize = ySize / ySegments;

  const geometry = new BufferGeometry();
  const indices = [];
  const heights = [];
  const vertices = [];

  const yPowMax = Math.log(ySize);
  const yBase = Math.E;

  // generate vertices for a simple grid geometry
  for (let i = 0; i <= xSegments; i++) {
    let x = i * xSegmentSize - xHalfSize; //midpoint of mesh is 0,0
    for (let j = 0; j <= ySegments; j++) {
      let pow = ((ySegments - j) / ySegments) * yPowMax;
      let y = -Math.pow(yBase, pow) + yHalfSize + 1;
      vertices.push(x, y, 0);
      heights.push(0); // for now our mesh is flat, so heights are zero
    }
  }

  for (let i = 0; i < xSegments; i++) {
    for (let j = 0; j < ySegments; j++) {
      let a = i * (ySegments + 1) + (j + 1);
      let b = i * (ySegments + 1) + j;
      let c = (i + 1) * (ySegments + 1) + j;
      let d = (i + 1) * (ySegments + 1) + (j + 1);
      // generate two faces (triangles) per iteration
      indices.push(a, b, d); // face one
      indices.push(b, c, d); // face two
    }
  }

  geometry.setIndex(indices);

  const displacementHeights = new Uint8Array(heights);
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("displacement", new Uint8BufferAttribute(heights, 1));

  return {
    geometry,
    nVertices,
    displacementHeights,
  };
}

export const Spectogram = ({
  audioAnalyser,
  frequencySamples,
  timeSamples,
}: Props) => {
  const meshRef = useRef<Mesh>();

  const {
    current: { geometry, nVertices, displacementHeights },
  } = useRef(createGridGeometry(frequencySamples, timeSamples));

  const colorMap = useMemo(() => {
    const colors = colormap({
      colormap: "freesurface-blue",
      nshades: 256,
      format: "rgba",
      alpha: 1,
    });

    colors[0] = [0, 0, 0, 0];

    const lut = colors.map((color) => {
      const red = color[0] / 255;
      const green = color[1] / 255;
      const blue = color[2] / 255;

      return new Vector3(red, green, blue);
    });

    return lut;
  }, []);

  useEffect(() => {
    meshRef.current.geometry.computeVertexNormals();
  });

  useFrame(() => {
    const frequencyData = audioAnalyser.getFrequencyData();

    const startVal = frequencySamples + 1;
    const endVal = nVertices - startVal;
    displacementHeights.copyWithin(0, startVal, nVertices + 1);
    displacementHeights.set(frequencyData, endVal - startVal);

    meshRef.current.geometry.setAttribute(
      "displacement",
      new Uint8BufferAttribute(displacementHeights, 1),
    );
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          v_lut: { value: colorMap },
        }}
      />
    </mesh>
  );
};

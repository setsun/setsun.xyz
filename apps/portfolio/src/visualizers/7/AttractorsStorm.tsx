import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import clamp from "lodash.clamp";
import sample from "lodash.sample";
import { AudioAnalyser, MathUtils } from "three";
import {
  createAttractor,
  updateAttractor,
  aizawaAttractor,
  arneodoAttractor,
  dadrasAttractor,
  dequanAttractor,
  lorenzAttractor,
  lorenzMod2Attractor,
} from "@/utils/attractors";
import { MeshLineGeometry } from "meshline";

const simulation = () =>
  sample<Function>([
    aizawaAttractor,
    // arneodoAttractor,
    // dadrasAttractor,
    // dequanAttractor,
    // lorenzAttractor,
    lorenzMod2Attractor,
  ]);

interface StormLineProps {
  radius: number;
  simulation: Function;
  width: number;
  color: string;
  speed: number;
  audioAnalyzer: AudioAnalyser;
}

const StormLine = ({
  radius,
  simulation,
  width,
  color,
  speed,
  audioAnalyzer,
}: StormLineProps) => {
  const line = useRef<MeshLineGeometry>(null!);
  const framesElapsed = useRef(0);

  const { positions, currentPosition } = useMemo(() => createAttractor(5), []);

  useFrame(() => {
    const modifier = clamp(
      audioAnalyzer.getAverageFrequency() / 100,
      0.005,
      1.5
    );

    let nextPosition = updateAttractor(
      currentPosition,
      radius,
      simulation,
      speed * modifier
    );

    if (Number.isNaN(nextPosition.x)) {
      framesElapsed.current += 1;

      if (framesElapsed.current > 500) {
        framesElapsed.current = 0;

        const firstPosition = positions[0].toArray();

        currentPosition.set(firstPosition[0], firstPosition[1], firstPosition[2]);
        nextPosition.set(firstPosition[0], firstPosition[1], firstPosition[2]);
      }
    }

    line.current.advance(nextPosition);
  });

  return (
    <mesh>
      <meshLineGeometry
        ref={line}
        attach="geometry"
        points={positions as unknown as number[]}
      />
      <meshLineMaterial
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
      />
    </mesh>
  );
};

interface AttractorsStormProps {
  count: number;
  colors: string[];
  radius: number;
  audioAnalyzer: AudioAnalyser;
}

const AttractorsStorm = ({
  count,
  colors,
  radius,
  audioAnalyzer,
}: AttractorsStormProps) => {
  const lines = useMemo(
    () =>
      new Array(count).fill(undefined).map(() => ({
        color: sample(colors) ?? colors[0],
        simulation: simulation() ?? lorenzAttractor,
        width: MathUtils.randFloat(0.1, 0.15),
        speed: MathUtils.randFloat(0.004, 0.008),
        radius: MathUtils.randFloat(2.25, 3) * radius,
      })),
    [count, colors, radius]
  );

  return (
    <group>
      {lines.map((props, index) => (
        <StormLine key={index} {...props} audioAnalyzer={audioAnalyzer} />
      ))}
    </group>
  );
};

export default AttractorsStorm;

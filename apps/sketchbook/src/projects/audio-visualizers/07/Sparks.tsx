import { useFrame } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import { AudioAnalyser, CatmullRomCurve3, MathUtils, Vector3 } from "three";

import { clamp } from "@/utils/math";

interface SparkLineProps {
  curve: Vector3[];
  width: number;
  speed: number;
  color: string;
  audioAnalyzer: AudioAnalyser;
}

const SparkLine = ({
  curve,
  width,
  speed,
  color,
  audioAnalyzer,
}: SparkLineProps) => {
  const material = useRef<MeshLineMaterial>(null!);

  useFrame(() => {
    const modifier = clamp(
      audioAnalyzer.getAverageFrequency() / 100,
      0.05,
      1.5,
    );

    material.current.uniforms.dashOffset.value -= speed * modifier;
  });

  return (
    <mesh>
      <meshLineGeometry
        attach="geometry"
        points={curve as unknown as number[]}
      />
      <meshLineMaterial
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.99}
      />
    </mesh>
  );
};

interface SparksProps {
  radius?: number;
  lineCount: number;
  colors: string[];
  audioAnalyzer: AudioAnalyser;
}

const Sparks = ({
  radius = 10,
  lineCount,
  colors,
  audioAnalyzer,
}: SparksProps) => {
  const getRadiusVariance = () => MathUtils.randFloat(0.2, 1);

  const lines = useMemo(
    () =>
      new Array(lineCount).fill(undefined).map((_, i) => {
        // starting position
        const position = new Vector3(
          Math.sin(0) * radius * getRadiusVariance(),
          Math.cos(0) * radius * getRadiusVariance(),
          0,
        );

        // increment angle to get all remaining points
        const points = new Array(30).fill(undefined).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;

          return position
            .add(
              new Vector3(
                Math.sin(angle) * radius * getRadiusVariance(),
                Math.cos(angle) * radius * getRadiusVariance(),
                Math.sin(angle) *
                  Math.cos(angle) *
                  radius *
                  getRadiusVariance(),
              ),
            )
            .clone();
        });

        // convert points to a curve
        const curve = new CatmullRomCurve3(points).getPoints(100);

        return {
          color: colors[Math.floor((colors.length - 1) * Math.random())],
          width: Math.max(0.1, (0.2 * i) / 10),
          speed: Math.max(0.001, 0.004 * Math.random()),
          curve,
        };
      }),
    [lineCount, radius, colors],
  );

  return (
    <group position={[-radius * 2, -radius, -10]} scale={[1, 1.3, 1]}>
      {lines.map((props, i) => (
        <SparkLine key={i} {...props} audioAnalyzer={audioAnalyzer} />
      ))}
    </group>
  );
};

export default Sparks;

import { useFrame } from "@react-three/fiber";
import clamp from "lodash.clamp";
import { useRef } from "react";
import { AudioAnalyser, DoubleSide, Mesh } from "three";

interface Props {
  audioAnalyzer: AudioAnalyser;
  innerRadius?: number;
  outerRadius?: number;
  maxScale?: number;
}

const PulsingRing = ({
  audioAnalyzer,
  innerRadius = 0.9,
  outerRadius = 1,
  maxScale = 1,
}: Props) => {
  const mesh = useRef<Mesh>(null!);

  useFrame(() => {
    const averageFrequency = audioAnalyzer.getAverageFrequency();
    const scaleModifier = clamp(averageFrequency / 100, 1, maxScale);

    mesh.current.scale.set(scaleModifier, scaleModifier, scaleModifier);
  });

  return (
    <mesh ref={mesh}>
      <ringGeometry args={[innerRadius, outerRadius, 100, 100]} />
      <meshBasicMaterial attach="material" color="white" side={DoubleSide} />
    </mesh>
  );
};

export default PulsingRing;

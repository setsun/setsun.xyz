import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AudioAnalyser, BufferGeometry } from "three";

import { getVectorsInCircle } from "@/utils/getVectorsInCircle";

interface Props {
  audioAnalyzer: AudioAnalyser;
  radius?: number;
}

const CircleWaveform = ({ audioAnalyzer, radius = 1 }: Props) => {
  const ellipseGeometry = useRef<BufferGeometry>(null);

  useFrame(() => {
    const values = Array.from(audioAnalyzer.getFrequencyData());

    if (!values.length) return;

    const points = getVectorsInCircle(values, radius, 0.005);

    ellipseGeometry?.current?.setFromPoints(points);
  });

  return (
    <line>
      <bufferGeometry attach="geometry" ref={ellipseGeometry} />
      <lineBasicMaterial attach="material" color="white" fog={false} />
    </line>
  );
};

export default CircleWaveform;

import { useFrame } from '@react-three/fiber';
import { Segment, SegmentObject, Segments } from '@react-three/drei';
import { useState, createRef } from 'react';
import { AudioAnalyser, Vector3 } from 'three';

interface Props {
  audioAnalyzer: AudioAnalyser;
  radius?: number;
  intensity?: number;
  countOverride?: number;
  lineWidth?: number;
}

const RadialBarFrequencyGraph = ({
  audioAnalyzer,
  radius = 1,
  intensity = 0.005,
  countOverride,
  lineWidth = 0.1
}: Props) => {
  const count = countOverride ?? audioAnalyzer.analyser.frequencyBinCount;

  const [segmentRefs] = useState(
    [...new Array(count)].map(() => createRef<SegmentObject>())
  );

  useFrame(() => {
    const values = Array.from(audioAnalyzer.getFrequencyData());

    if (!values.length) return;

    for (let i = 0; i < segmentRefs.length; i++) {
      const segmentRef = segmentRefs[i];
      const value = values[i];
      const theta = (i / segmentRefs.length) * Math.PI * 2;
      const outerRadius = radius + radius * 0.25 + value * intensity;

      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const x2 = Math.cos(theta) * outerRadius;
      const y2 = Math.sin(theta) * outerRadius;

      const lineGeometry = segmentRef.current;

      if (lineGeometry) {
        lineGeometry.start = new Vector3(x, y, 0);
        lineGeometry.end = new Vector3(x2, y2, 0);
      }
    }
  });

  return (
    <Segments limit={count} lineWidth={lineWidth}>
      {segmentRefs.map((segmentRef, i) => {
        const theta = (i / segmentRefs.length) * Math.PI;
        const outerRadius = radius + radius * 0.2;

        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;
        const x2 = Math.cos(theta) * outerRadius;
        const y2 = Math.sin(theta) * outerRadius;

        return (
          <Segment
            key={i}
            ref={segmentRef}
            start={[x, y, 0]}
            end={[x2, y2, 0]}
            color="white"
          />
        );
      })}
    </Segments>
  );
};

export default RadialBarFrequencyGraph;

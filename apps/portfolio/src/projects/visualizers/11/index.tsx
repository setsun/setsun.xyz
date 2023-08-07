import { useFrame } from "@react-three/fiber";
import { MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import { AudioAnalyser, Group, MathUtils, Vector3 } from "three";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";
import { getLogarithmicCurve } from "@/utils/three";

const getVariance = () => MathUtils.randFloat(1.5, 2);

const BlackHoleLine: React.FC<{
  curve: Vector3[];
  analyzer: AudioAnalyser;
}> = ({ curve, analyzer }) => {
  const material = useRef<MeshLineMaterial>(null!);

  const dashOffset = useMemo(() => getVariance(), []);

  useFrame(() => {
    const averageFrequency = analyzer.getAverageFrequency();
    const minimumOffset = 0.00003;
    const offset = averageFrequency / 300_000;

    material.current.uniforms.dashOffset.value -= offset + minimumOffset;
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
        lineWidth={0.005}
        color="white"
        dashArray={0.05}
        dashOffset={dashOffset}
        dashRatio={0.9}
      />
    </mesh>
  );
};

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const groupRef = useRef<Group>(null!);

  const curves = useMemo(
    () =>
      new Array(150).fill(undefined).map((_, i) =>
        getLogarithmicCurve({
          linearCoefficient: 1.25,
          logarithmicCoefficient: 0.005 + i * 0.0005,
          zScale: 0.01 + i * 0.0025,
          mirror: true,
        }),
      ),
    [],
  );

  useFrame(() => {
    const averageFrequency = analyzer.getAverageFrequency();

    const rotation = averageFrequency > 0 ? 0.003 : 0.001;

    groupRef.current.rotation.x += rotation;
    groupRef.current.rotation.z += rotation;
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 5, Math.PI / 6, 0]}>
      {curves.map((curve, i) => (
        <BlackHoleLine key={i} curve={curve} analyzer={analyzer} />
      ))}
    </group>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_11"
      camera={{
        position: [0, -12, 0],
      }}
      audioProps={{
        url: "/audio/Tomorrow.mp3",
        name: "Grum feat. Dom Youdan - Tomorrow",
        externalHref:
          "https://soundcloud.com/anjunabeats/4-grum-feat-dom-youdan-tomorrow-extended-mix",
      }}
      {...props}
    >
      {({ analyzer, isPlaying }) => (
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

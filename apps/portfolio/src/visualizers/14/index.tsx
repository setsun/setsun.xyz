import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { CatmullRomCurve3, MeshBasicMaterial, Vector3 } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";

import displaceTubeVertexShader from "./displace-tube.vert";

const POINTS = [
  [68.5, 185.5],
  [1, 262.5],
  [270.9, 281.9],
  [300, 212.8],
  [178, 155.7],
  [240.3, 72.3],
  [153.4, 0.6],
  [52.6, 53.3],
  [68.5, 185.5],
];

const noise3d = createNoise3D();

const PATH = new CatmullRomCurve3(
  POINTS.map((point) => {
    const x = point[0];
    const y = (noise3d(point[0], point[1], 0) - 0.5) * 200;
    const z = point[1];

    return new Vector3(x, y, z);
  }),
);

const MainScene = () => {
  const percentageRef = useRef(0);

  const { meshRef, uniforms } = useShaderUniforms({});

  useFrame(({ camera }) => {
    percentageRef.current += 0.0002;

    const p1 = PATH.getPointAt(percentageRef.current % 1);
    const p2 = PATH.getPointAt((percentageRef.current + 0.01) % 1);

    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(p2);
  });

  return (
    <>
      <mesh ref={meshRef}>
        <tubeGeometry args={[PATH, 300, 20, 30, true]} />

        <CustomShaderMaterial
          baseMaterial={MeshBasicMaterial}
          color="white"
          transparent
          wireframe
          opacity={0.5}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_14"
      audioProps={{
        url: "/audio/Afterglow.mp3",
        name: "Grum feat. Natalie Shay - Afterglow",
        externalHref:
          "https://soundcloud.com/anjunabeats/grum-feat-natalie-shay-afterglow",
      }}
      fallback={fallback}
    >
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

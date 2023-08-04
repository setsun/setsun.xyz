import { useFrame, useLoader } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
  Scanline,
} from "@react-three/postprocessing";
import { useRef } from "react";
import { createNoise3D } from "simplex-noise";
import {
  CatmullRomCurve3,
  MeshBasicMaterial,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

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
    const y = (noise3d(point[0], point[1], 0) - 0.5) * 10;
    const z = point[1];

    return new Vector3(x, y, z);
  }),
);

const MainScene = () => {
  const percentageRef = useRef(0);

  const { meshRef, uniforms } = useShaderUniforms({});

  const texture = useLoader(TextureLoader, "/images/eye-sketch.png");

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

      <EffectComposer>
        <Scanline density={15} />
        <ChromaticAberration
          radialModulation={false}
          modulationOffset={0.1}
          offset={new Vector2(0.01, 0.01)}
        />
      </EffectComposer>
    </>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_14"
      audioProps={{
        url: "/audio/dashstar.mp3",
        name: "Knock2 - dashstar*",
        externalHref: "https://soundcloud.com/nightmoderecs/knock2-dashstar-1",
      }}
      {...props}
    >
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

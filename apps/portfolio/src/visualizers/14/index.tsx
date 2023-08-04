import {
  Float,
  PerspectiveCamera,
  Trail,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
  Scanline,
} from "@react-three/postprocessing";
import { useRef } from "react";
import {
  AudioAnalyser,
  CatmullRomCurve3,
  MeshBasicMaterial,
  Vector2,
  Vector3,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

import displaceTubeVertexShader from "./displace-tube.vert";
import { Spaceship } from "./Spaceship";

const points = new Array(1000).fill(undefined).map((value, index) => {
  const theta = (index / 1000) * Math.PI * 2;
  const radius = 750;

  const x = Math.cos(theta) * radius;
  const y = Math.sin(theta) * radius;
  const z = Math.sin(theta) * radius;

  return new Vector3(x, y, z);
});

points.push(points[0]);

const PATH = new CatmullRomCurve3(points);

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const percentageRef = useRef(0);

  const { meshRef, uniforms } = useShaderUniforms({});

  useFrame(({ camera }) => {
    const averageFrequency = analyzer.getAverageFrequency();

    percentageRef.current += averageFrequency > 0 ? 0.0005 : 0.0001;

    const p1 = PATH.getPointAt(percentageRef.current % 1);
    const p2 = PATH.getPointAt((percentageRef.current + 0.01) % 1);

    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(p2);
  });

  return (
    <>
      <PerspectiveCamera makeDefault>
        <Float floatIntensity={0.1} rotationIntensity={0.1}>
          <group position={[0, 0, -10]}>
            <Trail width={1} length={4} attenuation={(t) => t * t}>
              <Spaceship />

              <meshLineMaterial color="white" />
            </Trail>
          </group>
        </Float>
      </PerspectiveCamera>

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
      {({ analyzer, isPlaying }) => (
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

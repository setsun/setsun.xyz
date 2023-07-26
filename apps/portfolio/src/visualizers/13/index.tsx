import { Center } from "@react-three/drei";
import { Color } from "three";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";
import { useTurntable } from "@/hooks/useTurntable";

import gradientFragmentShader from "./gradient.frag";
import gradientVertexShader from "./gradient.vert";
import { LilyFlower } from "./LilyFlower";

const MainScene = () => {
  const { meshRef, uniforms } = useShaderUniforms({
    uniforms: {
      u_bg_color: { value: new Color("#ffaff8") },
      u_color_a: { value: new Color("#00ffff") },
      u_color_b: { value: new Color("#6ceec8") },
    },
  });

  const turntableRef = useTurntable({
    speed: 0.003,
  });

  return (
    <>
      <Center
        scale={[0.3, 0.3, 0.3]}
        rotation={[0, -Math.PI / 2, -Math.PI / 16]}
        ref={turntableRef}
      >
        <LilyFlower />
      </Center>

      <mesh ref={meshRef} position={[0, 0, -2]}>
        <planeGeometry args={[20, 20, 128, 128]} />
        <shaderMaterial
          vertexShader={gradientVertexShader}
          fragmentShader={gradientFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_13"
      audioProps={{
        name: "Madeon - Miracle",
        url: "/audio/Miracle.mp3",
        externalHref: "https://soundcloud.com/madeon/miracle",
      }}
      fallback={fallback}
    >
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

import { Color } from "three";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";

import gradientFragmentShader from "./gradient.frag";
import gradientVertexShader from "./gradient.vert";

const MainScene = () => {
  const { meshRef, uniforms } = useShaderUniforms({
    uniforms: {
      u_bg_color: { value: new Color("#ffaff8") },
      u_color_a: { value: new Color("#00ffff") },
      u_color_b: { value: new Color("#6ceec8") },
    },
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[16, 16, 128, 128]} />
      <shaderMaterial
        vertexShader={gradientVertexShader}
        fragmentShader={gradientFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
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

import { Center } from "@react-three/drei";
import { AudioAnalyser, Color } from "three";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";
import { useTurntable } from "@/hooks/useTurntable";
import { avg, max } from "@/utils/arrays";
import { modulate } from "@/utils/math";

import gradientFragmentShader from "./gradient.frag";
import gradientVertexShader from "./gradient.vert";
import { LilyFlower } from "./LilyFlower";

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
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
        scale={[0.25, 0.25, 0.25]}
        rotation={[0, -Math.PI / 1.5, -Math.PI / 16]}
        ref={turntableRef}
      >
        <LilyFlower
          onUniformUpdate={(uniforms) => {
            const values = Array.from(analyzer.getFrequencyData());

            const lowerHalfArray = values.slice(0, values.length / 2 - 1);
            const upperHalfArray = values.slice(
              values.length / 2 - 1,
              values.length - 1,
            );
            const lowerMax = max(lowerHalfArray);
            const upperAvg = avg(upperHalfArray);

            const baseFrequency = modulate(
              Math.pow(lowerMax / lowerHalfArray.length, 0.8),
              0,
              1,
              0,
              8,
            );

            const topFrequency = modulate(
              upperAvg / upperHalfArray.length,
              0,
              1,
              0,
              4,
            );

            // update the shader uniforms, based on the audio data
            uniforms.u_base_frequency.value = baseFrequency / 2;
            uniforms.u_top_frequency.value = topFrequency * 6;
          }}
        />
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
      headline="VISUALIZER_12"
      audioProps={{
        name: "Madeon - Miracle",
        url: "/audio/Miracle.mp3",
        externalHref: "https://soundcloud.com/madeon/miracle",
      }}
      fallback={fallback}
    >
      {({ analyzer, isPlaying }) => (
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

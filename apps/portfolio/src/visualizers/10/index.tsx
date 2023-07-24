import { Color } from "three";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";
import { useTurntable } from "@/hooks/useTurntable";

import planetFragmentShader from "./planet.frag";
import planetVertexShader from "./planet.vert";

const MainScene = () => {
  const { meshRef, uniforms } = useShaderUniforms({
    uniforms: {
      u_color_a: { value: new Color("#ff0000") },
      u_color_b: { value: new Color("#ff4d00") },
      u_color_c: { value: new Color("#ff6700") },
      u_color_d: { value: new Color("#ff8100") },
    },
  });

  const turntableRef = useTurntable({ speed: 0.001 });

  return (
    <group ref={turntableRef}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[2, 10]} />
        <shaderMaterial
          fragmentShader={planetFragmentShader}
          vertexShader={planetVertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas headline="VISUALIZER_10" fallback={fallback}>
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

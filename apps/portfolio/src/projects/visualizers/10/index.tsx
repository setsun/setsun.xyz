import { Color } from "three";
import { useShaderUniforms } from "ui";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";
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

  const turntableRef = useTurntable({ speed: 0.0015 });

  return (
    <group ref={turntableRef}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[2, 32]} />
        <shaderMaterial
          fragmentShader={planetFragmentShader}
          vertexShader={planetVertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas headline="VISUALIZER_10" hasOrbitControls {...props}>
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

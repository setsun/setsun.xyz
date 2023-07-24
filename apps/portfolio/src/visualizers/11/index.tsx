import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";

import oceanFragmentShader from "./ocean.frag";
import oceanVertexShader from "./ocean.vert";

const MainScene = () => {
  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={oceanVertexShader}
        fragmentShader={oceanFragmentShader}
      />
    </mesh>
  );
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas headline="VISUALIZER_11" fallback={fallback}>
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

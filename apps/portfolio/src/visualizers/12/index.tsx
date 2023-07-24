import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";

import terrainFragmentShader from "./terrain.frag";
import terrainVertexShader from "./terrain.vert";

const MainScene = () => {
  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={terrainVertexShader}
        fragmentShader={terrainFragmentShader}
      />
    </mesh>
  );
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas headline="VISUALIZER_12" fallback={fallback}>
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

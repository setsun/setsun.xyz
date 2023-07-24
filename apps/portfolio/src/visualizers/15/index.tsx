import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";

const MainScene = () => {
  return null;
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas headline="VISUALIZER_15" fallback={fallback}>
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

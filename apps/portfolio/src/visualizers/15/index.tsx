import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

const MainScene = () => {
  return null;
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas headline="VISUALIZER_15" {...props}>
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

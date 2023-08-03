import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { useShaderUniforms } from "veda-ui";

import PointsImage from "@/components/PointsImage";
import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

const MainScene = () => {
  return (
    <group>
      <PointsImage imageUrl="/images/eye-sketch.png" />
    </group>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas headline="VISUALIZER_15" hasOrbitControls {...props}>
      {() => (
        <Suspense>
          <Physics>
            <MainScene />
          </Physics>
        </Suspense>
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

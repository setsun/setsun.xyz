import { AudioAnalyser, Color, Vector2 } from "three";
import { useShaderUniforms } from "veda-ui";

import { Spectogram } from "@/components/Spectogram";
import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

const frequencySamples = 256;
const timeSamples = 512;

const MainScene = ({ analyzer }: { analyzer: AudioAnalyser }) => {
  return (
    <group position={[0, 0, -40]} rotation={[-Math.PI / 3, 0, -Math.PI / 2]}>
      <Spectogram
        audioAnalyser={analyzer}
        frequencySamples={frequencySamples}
        timeSamples={timeSamples}
      />
    </group>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_15"
      audioProps={{
        url: "/audio/Skyline.mp3",
        name: "FKJ - Skyline",
        externalHref: "https://soundcloud.com/fkj-2/fkj-skyline",
      }}
      {...props}
    >
      {({ analyzer }) => <MainScene analyzer={analyzer} />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

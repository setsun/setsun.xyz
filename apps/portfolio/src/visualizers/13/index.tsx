import { AudioAnalyser } from "three";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

import { FBOParticles } from "./FBOParticles";

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  return <FBOParticles size={512} />;
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_13"
      audioProps={{
        name: "Agents Of Time - The Mirage",
        url: "/audio/The_Mirage.mp3",
        externalHref:
          "https://soundcloud.com/afterlifeofc/agents-of-time-the-mirage",
      }}
      {...props}
      camera={{
        position: [0, 0, 3],
      }}
    >
      {({ analyzer, isPlaying }) => (
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

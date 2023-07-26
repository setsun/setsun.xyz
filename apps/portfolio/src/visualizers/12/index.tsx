import { AudioAnalyser } from "three";

import VisualizerCanvas from "@/components/VisualizerCanvas";

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

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_12"
      audioProps={{
        name: "Agents Of Time - The Mirage",
        url: "/audio/The_Mirage.mp3",
        externalHref:
          "https://soundcloud.com/afterlifeofc/agents-of-time-the-mirage",
      }}
      fallback={fallback}
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

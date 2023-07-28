import clamp from "lodash.clamp";
import { AudioAnalyser } from "three";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

import { FBOParticles } from "./FBOParticles";

const GROWTH_FACTOR = 0.0002;
const DECAY_FACTOR = 0.0001;

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  return (
    <>
      <FBOParticles
        size={512}
        frequency={0.2}
        scale={0}
        onUniformUpdate={(uniforms) => {
          const averageFrequency = analyzer.getAverageFrequency();

          let nextFrequency = uniforms.u_frequency.value;

          if (averageFrequency > 0) {
            nextFrequency += GROWTH_FACTOR;
          } else {
            nextFrequency -= DECAY_FACTOR;
          }

          nextFrequency = clamp(nextFrequency, 0.01, 0.6);

          uniforms.u_frequency.value = nextFrequency;
        }}
      />
    </>
  );
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
        position: [0, 0, 2],
      }}
      hasOrbitControls
    >
      {({ analyzer, isPlaying }) => (
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

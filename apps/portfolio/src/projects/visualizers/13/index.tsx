import clamp from "lodash.clamp";
import { AudioAnalyser } from "three";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";
import { useTurntable } from "@/hooks/useTurntable";

import { FBOParticles } from "./FBOParticles";

const MIN_SPEED = 0.01;
const MAX_SPEED = 0.6;
const GROWTH_FACTOR = 0.0002;
const DECAY_FACTOR = 0.0001;

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const turntableRef = useTurntable({ speed: 0.005 });

  return (
    <group ref={turntableRef}>
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

          nextFrequency = clamp(nextFrequency, MIN_SPEED, MAX_SPEED);

          uniforms.u_frequency.value = nextFrequency;
        }}
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
      headline="VISUALIZER_13"
      audioProps={{
        name: "Agents Of Time - The Mirage",
        url: "/audio/The_Mirage.mp3",
        externalHref:
          "https://soundcloud.com/afterlifeofc/agents-of-time-the-mirage",
      }}
      {...props}
      camera={{
        position: [0, 0, 2.5],
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

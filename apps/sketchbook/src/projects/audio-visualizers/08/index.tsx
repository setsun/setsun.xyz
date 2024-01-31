import { AudioAnalyser } from "three";

import { ThreeCanvas } from "@/components/ThreeCanvas";
import { useTurntable } from "@/hooks/useTurntable";
import { clamp } from "@/utils/math";

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

const Visualizer = () => (
  <ThreeCanvas
    audioUrl="https://www.setsun.xyz/audio/The_Mirage.mp3"
    camera={{
      position: [0, 0, 2.5],
    }}
    hasOrbitControls
  >
    {({ analyzer, isPlaying }) => (
      <MainScene analyzer={analyzer} isPlaying={isPlaying} />
    )}
  </ThreeCanvas>
);

export default Visualizer;

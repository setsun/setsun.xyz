import { Stars } from "@react-three/drei";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { AudioAnalyser, Vector2 } from "three";

import RadialBarFrequencyGraph from "@/components/RadialBarFrequencyGraph";
import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";
import { useTurntable } from "@/hooks/useTurntable";

import Blob from "./Blob";
import PulsingRing from "./PulsingRing";

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const starRef = useTurntable({ speed: 0.0005 });
  const ringTwoRef = useTurntable({ speed: 0.005, reverse: true });
  const ringThreeRef = useTurntable({ speed: 0.005, reverse: true });

  return (
    <group>
      <mesh ref={starRef}>
        <Stars />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <RadialBarFrequencyGraph
          radius={350}
          intensity={0.75}
          countOverride={160}
          audioAnalyzer={analyzer}
        />

        <Blob radius={135} detail={8} amplitude={35} audioAnalyzer={analyzer} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} ref={ringTwoRef}>
        <PulsingRing
          innerRadius={350}
          outerRadius={350.5}
          audioAnalyzer={analyzer}
        />
      </mesh>

      <mesh ref={ringThreeRef}>
        <PulsingRing
          innerRadius={350}
          outerRadius={350.5}
          audioAnalyzer={analyzer}
        />
      </mesh>
    </group>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_02"
      audioProps={{
        url: "/audio/Funk.mp3",
        name: "Martin Garrix & Julian Jordan - Funk",
        externalHref:
          "https://soundcloud.com/martingarrix/martin-garrix-julian-jordan-the-funk",
      }}
      camera={{
        position: [550, 325, -500],
      }}
      hasOrbitControls
      {...props}
    >
      {({ analyzer, isPlaying }) => (
        <>
          <MainScene analyzer={analyzer} isPlaying={isPlaying} />

          {/* todo: glitch is buggy */}
          {/* <EffectComposer>
            <Glitch
              delay={new Vector2(1.5, 3.5)} // min and max glitch delay
              duration={new Vector2(0.6, 1.0)} // min and max glitch duration
              strength={new Vector2(0.3, 1.0)} // min and max glitch strength
              mode={GlitchMode.SPORADIC} // glitch mode
              active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
              ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            />
          </EffectComposer> */}
        </>
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

import { Stars } from "@react-three/drei";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { AudioAnalyser, Vector2 } from "three";

import VisualizerCanvas from "@/components/VisualizerCanvas";
import RadialBarFrequencyGraph from "@/components/RadialBarFrequencyGraph";
import { useTurntable } from "@/hooks/useTurntable";
import MovingBall from "./MovingBall";
import PulsingRing from "./PulsingRing";

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const starRef = useTurntable({ speed: 0.0005 });
  const curveRef = useTurntable({ speed: 0.0005, reverse: true });
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

      <mesh ref={curveRef}>
        <MovingBall
          radius={125}
          detail={10}
          amplitude={35}
          audioAnalyzer={analyzer}
        />
      </mesh>
    </group>
  );
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_02"
      songProps={{
        url: "/audio/Funk.mp3",
        name: "Martin Garrix & Julian Jordan - Funk",
        externalHref:
          "https://soundcloud.com/martingarrix/martin-garrix-julian-jordan-the-funk",
      }}
      camera={{
        position: [550, 325, -500],
      }}
      fallback={fallback}
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

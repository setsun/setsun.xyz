import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { useTurntable } from "../../hooks/useTurntable";
import { useAudioAnalyzer } from "../../hooks/useAudioAnalyzer";
import { AudioAnalyser, Vector2 } from "three";
import { useEffect } from "react";
import MovingBall from "./MovingBall";
import PulsingRing from "./PulsingRing";
import RadialBarFrequencyGraph from "../../components/RadialBarFrequencyGraph";
import VisualizerCanvas from "../../components/VisualizerCanvas";

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

const Visualizer = () => {
  return (
    <VisualizerCanvas
      songProps={{
        url: "audio/Funk.mp3",
        name: "Martin Garrix & Julian Jordan - Funk",
        externalHref:
          "https://soundcloud.com/martingarrix/martin-garrix-julian-jordan-the-funk",
      }}
      headline="VISUALIZER _02"
      camera={{
        position: [550, 325, -500],
      }}
    >
      {({ analyzer, isPlaying }) => (
        <>
          <MainScene analyzer={analyzer} isPlaying={isPlaying} />

          <EffectComposer>
            <Glitch
              delay={new Vector2(5, 5)}
              duration={new Vector2(0.3, 0.3)}
            />
          </EffectComposer>
        </>
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

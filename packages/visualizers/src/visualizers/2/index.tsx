import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { useTurntable } from "../../hooks/useTurntable";
import { useAudioAnalyzer } from "../../hooks/useAudioAnalyzer";
import { Vector2 } from "three";
import { useEffect } from "react";
import MovingBall from "./MovingBall";
import PulsingRing from "./PulsingRing";
import RadialBarFrequencyGraph from "../../components/RadialBarFrequencyGraph";

const MainScene = ({ isPlaying }: { isPlaying: boolean }) => {
  const { audio, analyzer } = useAudioAnalyzer({
    url: "audio/Funk.mp3",
    loop: true,
    fftSize: 512,
  });

  const starRef = useTurntable({ speed: 0.0005 });
  const curveRef = useTurntable({ speed: 0.0005, reverse: true });
  const ringTwoRef = useTurntable({ speed: 0.005, reverse: true });
  const ringThreeRef = useTurntable({ speed: 0.005, reverse: true });

  useEffect(() => {
    if (isPlaying && !audio.isPlaying) {
      audio.play();
    }
  }, [audio, isPlaying]);

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
    <Canvas
      camera={{
        type: "PerspectiveCamera",
        position: [550, 325, -500],
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.01,
        far: 5000,
      }}
    >
      <MainScene isPlaying />

      <EffectComposer>
        <Glitch delay={new Vector2(5, 5)} duration={new Vector2(0.3, 0.3)} />
      </EffectComposer>
    </Canvas>
  );
};

export default Visualizer;

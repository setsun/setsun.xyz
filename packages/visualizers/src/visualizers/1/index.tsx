import { Canvas, useFrame } from "@react-three/fiber";
import { HilbertCurve, HilbertCurveRefData } from "./HibertCurve";
import { useTurntable } from "../../hooks/useTurntable";
import { useAudioAnalyzer } from "../../hooks/useAudioAnalyzer";
import { useEffect, useRef } from "react";

const MainScene = ({ isPlaying }: { isPlaying: boolean }) => {
  const { audio, analyzer } = useAudioAnalyzer({
    url: "audio/Bring_Back.mp3",
    loop: true,
    fftSize: 512,
  });

  const turntableRef = useTurntable({ speed: 0.0025 });
  const curveRef = useRef<HilbertCurveRefData>(null!);

  useEffect(() => {
    if (isPlaying && !audio.isPlaying) {
      audio.play();
    }
  }, [audio, isPlaying]);

  useFrame(() => {
    const line = curveRef.current.line;

    if (isPlaying && line) {
      const averageFrequency = analyzer.getAverageFrequency();
      const modifier = averageFrequency / 10;

      line.material.dashOffset += modifier;
      line.material.dashSize += 0.01;
      line.material.gapSize += 0.01;
    }
  });

  return (
    <mesh ref={turntableRef}>
      <HilbertCurve
        ref={curveRef}
        size={150}
        iterations={2}
        lineProps={{
          dashed: true,
          dashSize: 50,
          gapSize: 25,
          lineWidth: 2.5,
        }}
      />
    </mesh>
  );
};

const Visualizer = () => {
  return (
    <Canvas
      camera={{
        position: [-125, 75, 25],
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.01,
        far: 5000,
      }}
    >
      <MainScene isPlaying />
    </Canvas>
  );
};

export default Visualizer;

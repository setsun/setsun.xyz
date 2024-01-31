import { OrbitControls } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { AudioAnalyser } from "three";

import { useAudioAnalyzer } from "@/hooks/useAudioAnalyzer";

type FunctionAsChildren = (props: {
  analyzer: AudioAnalyser;
  togglePlaying: () => void;
  isPlaying: boolean;
  isCanvasCreated: boolean;
}) => React.ReactNode;

type ThreeCanvasAudioAnalyzerProps = {
  children: FunctionAsChildren;
  audioUrl: string;
  togglePlaying: () => void;
  isPlaying: boolean;
  isCanvasCreated: boolean;
};

interface ThreeCanvasProps {
  children: FunctionAsChildren;
  audioUrl: string;
  camera?: Partial<Omit<CanvasProps["camera"], "attach" | "children">>;
  hasOrbitControls?: boolean;
}

const ThreeCanvasAudioAnalyzer: React.FC<ThreeCanvasAudioAnalyzerProps> = ({
  children,
  audioUrl,
  togglePlaying,
  isPlaying,
  isCanvasCreated,
}) => {
  const { audio, analyzer } = useAudioAnalyzer({
    url: audioUrl,
    loop: true,
    fftSize: 512,
  });

  useEffect(() => {
    if (isPlaying && !audio.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audio, isPlaying]);

  return children({ analyzer, togglePlaying, isPlaying, isCanvasCreated });
};

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  children,
  camera,
  audioUrl,
  hasOrbitControls,
}) => {
  const [isCanvasCreated, setIsCanvasCreated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Canvas
      shadows
      gl={{
        // todo: remove by Three.js 165
        // https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733
        useLegacyLights: true,
      }}
      resize={{ debounce: 0 }}
      onCreated={() => {
        setIsCanvasCreated(true);
      }}
      camera={{
        type: "PerspectiveCamera",
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.01,
        far: 5000,
        ...camera,
      }}
    >
      <ThreeCanvasAudioAnalyzer
        audioUrl={audioUrl}
        togglePlaying={() => setIsPlaying((previous) => !previous)}
        isCanvasCreated={isCanvasCreated}
        isPlaying={isPlaying}
      >
        {children}
      </ThreeCanvasAudioAnalyzer>

      {hasOrbitControls && <OrbitControls />}
    </Canvas>
  );
};

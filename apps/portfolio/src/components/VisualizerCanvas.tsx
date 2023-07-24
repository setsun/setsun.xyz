import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { OrbitControls } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useEffect, useState } from "react";
import { AudioAnalyser } from "three";

import { useAudioAnalyzer } from "@/hooks/useAudioAnalyzer";

type FunctionAsChildren = (props: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => React.ReactNode;

export interface VisualizerCanvasProps {
  children: FunctionAsChildren;
  fallback?: React.ReactNode;
  headline: string;
  audioProps?: {
    url: string;
    name: string;
    externalHref: string;
  };
  className?: string;
  camera?: Partial<Omit<CanvasProps["camera"], "attach" | "children">>;
}

type VisualizerControlsProps = {
  children: FunctionAsChildren;
  songUrl: string;
  isPlaying: boolean;
};

const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  children,
  songUrl,
  isPlaying,
}) => {
  const { audio, analyzer } = useAudioAnalyzer({
    url: songUrl,
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

  return children({ analyzer, isPlaying });
};

const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({
  children,
  fallback,
  audioProps,
  headline,
  className,
  camera,
}) => {
  const [isCanvasCreated, setIsCanvasCreated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative h-screen ${className}`}>
      {!isCanvasCreated && fallback}

      <Canvas
        shadows
        resize={{ debounce: 0 }}
        onCreated={() => {
          setIsCanvasCreated(true);
        }}
        // @ts-ignore
        camera={{
          type: "PerspectiveCamera",
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.01,
          far: 5000,
          ...camera,
        }}
      >
        {audioProps ? (
          <VisualizerControls songUrl={audioProps.url} isPlaying={isPlaying}>
            {children}
          </VisualizerControls>
        ) : (
          // todo: fix lol
          // @ts-ignore
          children()
        )}

        <OrbitControls />
      </Canvas>

      {isCanvasCreated && (
        <div
          className="absolute left-0 top-0 h-full w-full p-4 text-xs"
          style={{ pointerEvents: "none" }}
        >
          {audioProps && (
            <div className="absolute left-0 top-0 p-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
                style={{ pointerEvents: "all" }}
                href={audioProps.externalHref}
              >
                <b>{audioProps.name} ↗</b>
              </a>
              <p className="m-0">⸻</p>

              <button
                className="flex items-center"
                style={{ pointerEvents: "all" }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <PauseIcon className="mr-1 inline" />
                ) : (
                  <PlayIcon className="mr-1 inline" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          )}

          <p className="font-antonio absolute right-0 top-0 p-4 text-2xl">
            {headline}
          </p>
        </div>
      )}
    </div>
  );
};

export default VisualizerCanvas;

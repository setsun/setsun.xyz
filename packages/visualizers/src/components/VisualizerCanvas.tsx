import { Canvas, CanvasProps } from "@react-three/fiber";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";
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
  songProps?: {
    url: string;
    name: string;
    externalHref: string;
  };
  className?: string;
  camera?: Partial<Omit<CanvasProps["camera"], "attach">>;
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
  songProps,
  headline,
  className,
  camera,
}) => {
  const [isCanvasCreated, setIsCanvasCreated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);


  console.log({ fallback });

  return (
    <div className={`relative h-screen ${className}`}>
      {!isCanvasCreated && fallback}

      <Canvas
        shadows
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
        {songProps ? (
          <VisualizerControls songUrl={songProps.url} isPlaying={isPlaying}>
            {children}
          </VisualizerControls>
        ) : (
          // todo: fix lol
          // @ts-ignore
          children()
        )}
      </Canvas>

      {isCanvasCreated && (
        <div className="absolute left-0 top-0 flex h-full w-full justify-between p-4 text-xs">
          {songProps && (
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
                href={songProps.externalHref}
              >
                <b>{songProps.name} ↗</b>
              </a>
              <p className="m-0">⸻</p>

              <button
                className="flex items-center"
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

          <p className="font-antonio text-2xl">{headline}</p>
        </div>
      )}
    </div>
  );
};

export default VisualizerCanvas;

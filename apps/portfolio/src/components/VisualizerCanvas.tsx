import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { OrbitControls } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useEffect, useState } from "react";
import { AudioAnalyser } from "three";
import { Button } from "veda-ui";

import { useAudioAnalyzer } from "@/hooks/useAudioAnalyzer";

type FunctionAsChildren = (props: {
  analyzer: AudioAnalyser;
  // todo: this type could be better
  controls: Record<string, any>;
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
  // todo: this type could be better
  controls?: Record<string, any>;
  className?: string;
  camera?: Partial<Omit<CanvasProps["camera"], "attach" | "children">>;
}

type VisualizerControlsProps = {
  children: FunctionAsChildren;
  controls?: Record<string, any>;
  songUrl: string;
  isPlaying: boolean;
};

const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  children,
  controls,
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

  return children({ analyzer, controls, isPlaying });
};

const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({
  children,
  fallback,
  audioProps,
  controls,
  headline,
  className,
  camera,
}) => {
  const [isCanvasCreated, setIsCanvasCreated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const [{ ...controlsData }] = useControls(() => ({
    ...controls,
  }));

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
          <VisualizerControls
            songUrl={audioProps.url}
            controls={controls}
            isPlaying={isPlaying}
          >
            {children}
          </VisualizerControls>
        ) : (
          // todo: fix lol
          // @ts-ignore
          children({ controls: controlsData })
        )}

        <OrbitControls />
      </Canvas>

      {isCanvasCreated && (
        <div className="absolute left-0 top-0 flex h-full w-full justify-between p-4 text-xs">
          <div className="mr-4 text-left">
            {audioProps && (
              <>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                  href={audioProps.externalHref}
                >
                  <b>{audioProps.name} ↗</b>
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
              </>
            )}
          </div>

          <div className="text-right">
            <p className="font-antonio text-2xl">{headline}</p>

            {controls && (
              <>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-xs underline"
                  onClick={() => setShowControls(!showControls)}
                >
                  {showControls ? "Hide Controls" : "Show Controls"}
                </Button>

                <Leva
                  hidden={!showControls}
                  titleBar={{
                    position: {
                      x: 0,
                      y: 72,
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizerCanvas;

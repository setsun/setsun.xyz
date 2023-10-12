import { OrbitControls, StatsGl } from "@react-three/drei";
import { Canvas, CanvasProps } from "@react-three/fiber";
import classNames from "classnames";
import { Leva, useControls } from "leva";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RxArrowLeft,
  RxArrowRight,
  RxInfoCircled,
  RxPause,
  RxPlay,
} from "react-icons/rx";
import { AudioAnalyser } from "three";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "veda-ui";

import { useAudioAnalyzer } from "@/hooks/useAudioAnalyzer";

type FunctionAsChildren = (props: {
  analyzer: AudioAnalyser;
  // todo: this type could be better
  controls: Record<string, any>;
  isPlaying: boolean;
}) => React.ReactNode;

export interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface VisualizerCanvasProps {
  children: FunctionAsChildren;
  headline: string;
  pagination: Pagination;
  className?: string;
  fallback?: React.ReactNode;
  audioProps?: {
    url: string;
    name: string;
    externalHref: string;
  };
  // todo: this type could be better
  controls?: Record<string, any>;
  camera?: Partial<Omit<CanvasProps["camera"], "attach" | "children">>;
  info?: React.ReactNode;
  hasOrbitControls?: boolean;
  debug?: boolean;
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
  pagination,
  fallback,
  audioProps,
  controls,
  headline,
  className,
  camera,
  info,
  hasOrbitControls,
  debug,
}) => {
  const [isCanvasCreated, setIsCanvasCreated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const [{ ...controlsData }] = useControls(() => ({
    ...controls,
  }));

  const isFirstPage = pagination.currentPage === 1;
  const isLastPage = pagination.currentPage === pagination.totalPages;

  // todo: quick and easy, prolly a better way to refactor later
  const searchParams = useSearchParams();
  const isImmersive = searchParams.get("immersive") === "true";

  return (
    <div
      className={classNames(
        `relative h-screen ${className}`,
        isCanvasCreated ? "animate-fade-in" : "opacity-0",
      )}
      style={{ animationFillMode: "forwards", animationDuration: "2s" }}
    >
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

        {hasOrbitControls && <OrbitControls />}

        {debug && <StatsGl />}
      </Canvas>

      {isCanvasCreated && !isImmersive && (
        <div className="pointer-events-none absolute left-0 top-0 grid h-full w-full grid-cols-1 grid-rows-3 justify-between p-4 text-xs">
          {/** Note: we add "pointer-events-none to the container div above, because we want the Canvas to be clickable." */}
          {/** We attach explicit pointer-event CSS classes to individual DOM button / link elements that we want to be interactive */}
          <div className="flex items-start justify-between">
            <div className="mr-4 text-left">
              {audioProps && (
                <>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-flex items-center"
                    href={audioProps.externalHref}
                  >
                    <b>{audioProps.name} ↗</b>
                  </a>
                  <p className="m-0">⸻</p>

                  <button
                    className="pointer-events-auto flex items-center"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <RxPause className="mr-1 inline" />
                    ) : (
                      <RxPlay className="mr-1 inline" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                </>
              )}
            </div>

            <div className="text-right">
              <div>
                <p className="font-antonio text-2xl">{headline}</p>

                {controls && (
                  <>
                    <Button
                      variant="link"
                      size="sm"
                      className="pointer-events-auto p-0 text-xs"
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
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="link"
              size="icon"
              className="pointer-events-auto p-0"
              disabled={isFirstPage}
            >
              {/** todo: this component is getting to be a little messy / not reusable in many contexts */}
              <Link href={`/visualizers/${pagination.currentPage - 1}`}>
                <RxArrowLeft />
              </Link>
            </Button>

            <Button
              variant="link"
              size="icon"
              className="pointer-events-auto p-0"
              disabled={isLastPage}
            >
              {/** todo: this component is getting to be a little messy / not reusable in many contexts */}
              <Link href={`/visualizers/${pagination.currentPage + 1}`}>
                <RxArrowRight />
              </Link>
            </Button>
          </div>

          <div className="flex items-end justify-end">
            {info && (
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="link"
                    size="icon"
                    className="pointer-events-auto p-0"
                  >
                    <RxInfoCircled />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-2">{headline}</DialogTitle>
                    <DialogDescription>{info}</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizerCanvas;

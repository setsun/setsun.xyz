import { Canvas, RenderProps } from "@react-three/fiber";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";
import { useEffect, useState } from "react";
import { AudioAnalyser } from "three";

interface Props {
  children: (props: {
    analyzer: AudioAnalyser;
    isPlaying: boolean;
  }) => React.ReactNode;
  songUrl: string;
  songName: string;
  headline: string;
  href: string;
  className?: string;
}

type VisualizerControlsProps = Pick<Props, "children" | "songUrl"> & {
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

const VisualizerCanvas: React.FC<Props> = ({
  children,
  songUrl,
  songName,
  headline,
  href,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative h-screen ${className}`}>
      <Canvas
        shadows
        camera={{
          type: "PerspectiveCamera",
          position: [0, 0, -2.25],
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.01,
          far: 5000,
        }}
      >
        <VisualizerControls songUrl={songUrl} isPlaying={isPlaying}>
          {children}
        </VisualizerControls>
      </Canvas>

      <div className="absolute left-0 top-0 h-full w-full text-xs">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
          href={href}
        >
          <b>{songName} ↗</b>
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

        <p className="font-antonio absolute right-0 top-0 text-3xl">
          {headline}
        </p>
      </div>
    </div>
  );
};

export default VisualizerCanvas;

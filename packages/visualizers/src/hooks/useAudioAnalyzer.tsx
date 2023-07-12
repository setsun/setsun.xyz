import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  AudioLoader,
  AudioListener,
  AudioAnalyser,
  Audio as ThreeAudio,
  Camera,
} from "three";

// @ts-ignore
import { initializeUnmute } from '@/vendor/unmute';

interface Props {
  url: string;
  loop: boolean;
  fftSize?: number;
}

function initializeAudioAnalyzer(
  { url, loop, fftSize }: Props,
  camera: Camera
) {
  const listener = new AudioListener();
  const audio = new ThreeAudio(listener);
  const analyzer = new AudioAnalyser(audio, fftSize);
  const loader = new AudioLoader();

  let hasAudioLoaded = false;

  function loadAudio() {
    return new Promise((resolve) => {
      loader.load(url, (buffer) => {
        audio.setBuffer(buffer);
        audio.setLoop(loop);
        camera.add(listener);

        hasAudioLoaded = true;

        resolve(true);
      });
    });
  }

  return {
    analyzer,
    listener,
    cleanup: () => {
      camera.remove(listener);
    },
    play: async () => {
      if (!hasAudioLoaded) {
        await loadAudio();
      }

      audio.setVolume(1.0);

      audio.play();
    },
    pause: () => {
      audio.pause();
    },
  };
}

export function useAudioAnalyzer(props: Props) {
  const { camera } = useThree();

  const { current: audioAnalyser } = useRef(
    initializeAudioAnalyzer(props, camera)
  );

  useEffect(() => {
    initializeUnmute();

    return () => {
      audioAnalyser.cleanup();
    };
  });

  return {
    play: async () => {
      await audioAnalyser.play();
    },
    pause: () => {
      audioAnalyser.pause();
    },
    analyzer: audioAnalyser.analyzer,
  };
}

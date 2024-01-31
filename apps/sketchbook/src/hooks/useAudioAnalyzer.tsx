import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import {
  Audio as ThreeAudio,
  AudioAnalyser,
  AudioListener,
  AudioLoader,
} from "three";

interface Props {
  url: string;
  loop: boolean;
  fftSize?: number;
}

export function useAudioAnalyzer({ url, loop, fftSize = 32 }: Props) {
  const { camera } = useThree();
  const [listener] = useState(() => new AudioListener());
  const [audio] = useState(() => new ThreeAudio(listener));
  const [analyzer] = useState(() => new AudioAnalyser(audio, fftSize));

  const buffer = useLoader(AudioLoader, url);

  useEffect(() => {
    audio.setBuffer(buffer);
    audio.setLoop(loop);
    camera.add(listener);

    return () => {
      if (audio.isPlaying) {
        audio.stop();
        audio.disconnect();
      }

      camera.remove(listener);
    };
  }, [camera, listener, audio, buffer, loop]);

  return {
    audio,
    analyzer,
  };
}

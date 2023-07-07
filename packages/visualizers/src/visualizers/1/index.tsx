import { Canvas, useFrame } from "@react-three/fiber";
import { HilbertCurve, HilbertCurveRefData } from "./HibertCurve";
import { useTurntable } from "../../hooks/useTurntable";
import { useRef } from "react";
import VisualizerCanvas from "../../components/VisualizerCanvas";
import { AudioAnalyser } from "three";

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const turntableRef = useTurntable({ speed: 0.0025 });
  const curveRef = useRef<HilbertCurveRefData>(null!);

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
  /**
   *    position: [-125, 75, 25],
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.01,
        far: 5000,
   */
  return (
    <VisualizerCanvas
      songUrl="audio/Bring_Back.mp3"
      songName="Qrion - Bring Back"
      headline="VISUALIZER _01"
      href="https://soundcloud.com/nesthq/qrion-bring-back"
    >
      {({ analyzer, isPlaying }) => (
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

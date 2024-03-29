import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import { AudioAnalyser } from "three";

import { ThreeCanvas } from "@/components/ThreeCanvas";
import { useTurntable } from "@/hooks/useTurntable";

import { HilbertCurve, HilbertCurveRefData } from "./HibertCurve";

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

const Visualizer: React.FC = () => (
  <ThreeCanvas
    audioUrl="https://www.setsun.xyz/audio/Bring_Back.mp3"
    camera={{
      position: [-125, 75, 25],
    }}
    hasOrbitControls
  >
    {({ analyzer, isPlaying }) => (
      <>
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={600} />
        </EffectComposer>
      </>
    )}
  </ThreeCanvas>
);

export default Visualizer;

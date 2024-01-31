import { Stars } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { AudioAnalyser } from "three";

import { ThreeCanvas } from "@/components/ThreeCanvas";

import AttractorsStorm from "./AttractorsStorm";
import Sparks from "./Sparks";

extend({ MeshLineGeometry, MeshLineMaterial });

const ATTRACTORS_COLORS = [
  "#fbe555",
  "#fb9224",
  "#f45905",
  "#ffeed0",
  "#feff89",
];

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => (
  <>
    <Stars count={500} />

    <AttractorsStorm
      colors={ATTRACTORS_COLORS}
      count={2000}
      radius={10}
      audioAnalyzer={analyzer}
    />

    <Sparks
      colors={ATTRACTORS_COLORS}
      lineCount={25}
      radius={12.5}
      audioAnalyzer={analyzer}
    />

    <EffectComposer>
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
    </EffectComposer>
  </>
);

const Visualizer = () => (
  <ThreeCanvas
    audioUrl="https://www.setsun.xyz/audio/Burning.mp3"
    camera={{
      position: [0, 0, -60],
    }}
    hasOrbitControls
  >
    {({ analyzer, isPlaying }) => (
      <MainScene analyzer={analyzer} isPlaying={isPlaying} />
    )}
  </ThreeCanvas>
);

export default Visualizer;

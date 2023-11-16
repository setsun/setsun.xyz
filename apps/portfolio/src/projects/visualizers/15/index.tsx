import { Sky, Stage } from "@react-three/drei";
import { AudioAnalyser, Color, Vector2 } from "three";
import { useShaderUniforms } from "ui";

import { Spectogram } from "@/components/Spectogram";
import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

import { TheThreeGraces } from "./TheThreeGraces";

const frequencySamples = 256;
const timeSamples = 512;

const MainScene = ({ analyzer }: { analyzer: AudioAnalyser }) => {
  return (
    <>
      <Stage />

      <Sky
        distance={1000}
        inclination={0.6}
        azimuth={0.1}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        rayleigh={0.5}
        turbidity={10}
      />

      <group position={[0, -20, -10]} scale={0.1}>
        <TheThreeGraces />
      </group>

      <group position={[0, 0, -50]} rotation={[-Math.PI / 3, 0, -Math.PI / 2]}>
        <Spectogram
          audioAnalyser={analyzer}
          frequencySamples={frequencySamples}
          timeSamples={timeSamples}
        />
      </group>
    </>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_15"
      audioProps={{
        url: "/audio/Skyline.mp3",
        name: "FKJ - Skyline",
        externalHref: "https://soundcloud.com/fkj-2/fkj-skyline",
      }}
      {...props}
    >
      {({ analyzer }) => <MainScene analyzer={analyzer} />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

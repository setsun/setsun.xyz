import { CameraShake, Sparkles } from "@react-three/drei";
import { AudioAnalyser } from "three";

import VisualizerCanvas from "@/components/VisualizerCanvas";
import MovingRoad from "./MovingRoad";

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => (
  <>
    <fog attach="fog" args={["#000000", 0.5, 1.5]} />

    <CameraShake
      maxPitch={0.05}
      maxRoll={0}
      maxYaw={0.05}
      pitchFrequency={0.1}
      rollFrequency={0}
      yawFrequency={0.1}
    />

    <mesh position={[0, 2.5, 0]}>
      <Sparkles scale={5} size={0.25} count={100} />
    </mesh>

    <MovingRoad audioAnalyzer={analyzer} />
  </>
);

const Visualizer = () => (
  <VisualizerCanvas
    headline="VISUALIZER_06"
    songProps={{
      url: "https://www.setsun.xyz/audio/Hold_On_Remix.mp3",
      name: "Rezident - The Anjunadeep Edition 328",
      externalHref:
        "https://soundcloud.com/anjunadeep/the-anjunadeep-edition-328",
    }}
    camera={{
      position: [0, 0.05, 1.1],
    }}
  >
    {({ analyzer, isPlaying }) => (
      <MainScene analyzer={analyzer} isPlaying={isPlaying} />
    )}
  </VisualizerCanvas>
);

export default Visualizer;

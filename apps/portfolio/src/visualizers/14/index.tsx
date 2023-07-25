import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";

const MainScene = () => {
  return null;
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_14"
      audioProps={{
        name: "Madeon - Miracle",
        url: "/audio/Miracle.mp3",
        externalHref: "https://soundcloud.com/madeon/miracle",
      }}
      fallback={fallback}
    >
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

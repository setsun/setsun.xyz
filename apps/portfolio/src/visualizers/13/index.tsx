import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas from "@/components/VisualizerCanvas";

const MainScene = () => {
  return null;
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_13"
      audioProps={{
        name: "Agents Of Time - The Mirage",
        url: "/audio/The_Mirage.mp3",
        externalHref:
          "https://soundcloud.com/afterlifeofc/agents-of-time-the-mirage",
      }}
      fallback={fallback}
    >
      {() => <MainScene />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

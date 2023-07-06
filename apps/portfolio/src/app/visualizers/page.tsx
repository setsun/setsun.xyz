"use client";

import { VisualizerOne } from "visualizers";

interface Props {}

const Visualizers: React.FC<Props> = (props) => {
  return (
    <div className="flex h-screen items-center justify-center text-3xl">
      <VisualizerOne />
    </div>
  );
};

export default Visualizers;

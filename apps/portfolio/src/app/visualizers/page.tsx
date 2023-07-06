"use client";

import {
  VisualizerOne,
  VisualizerTwo,
  VisualizerThree,
  VisualizerFive,
} from "visualizers";

interface Props {}

const Visualizers: React.FC<Props> = (props) => {
  return (
    <div className="flex h-screen items-center justify-center text-3xl">
      <VisualizerThree />
    </div>
  );
};

export default Visualizers;

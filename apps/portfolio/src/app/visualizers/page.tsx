"use client";

import {
  VisualizerOne,
  VisualizerTwo,
  VisualizerThree,
  VisualizerFour,
  VisualizerFive,
} from "visualizers";

interface Props {}

const Visualizers: React.FC<Props> = (props) => {
  return (
    <div className="flex h-screen items-center justify-center text-3xl">
      <VisualizerOne />
      <VisualizerTwo />
      <VisualizerThree />
      <VisualizerFour />
      <VisualizerFive />
    </div>
  );
};

export default Visualizers;

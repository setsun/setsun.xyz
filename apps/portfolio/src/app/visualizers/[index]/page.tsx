"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import RingLoader from "react-spinners/RingLoader";

interface Props {}

const VisualizerOne = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerOne),
  { ssr: false }
);
const VisualizerTwo = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerTwo),
  { ssr: false }
);
const VisualizerThree = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerThree),
  { ssr: false }
);
const VisualizerFour = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerFour),
  { ssr: false }
);
const VisualizerFive = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerFive),
  { ssr: false }
);
const VisualizerSix = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerSix),
  { ssr: false }
);

const Visualizer: React.FC<{ index: number }> = ({ index }) => {
  switch (index) {
    case 1:
      return <VisualizerOne />;
    case 2:
      return <VisualizerTwo />;
    case 3:
      return <VisualizerThree />;
    case 4:
      return <VisualizerFour />;
    case 5:
      return <VisualizerFive />;
    case 6:
      return <VisualizerSix />;
    default:
      return null;
  }
};

const Visualizers: React.FC<Props> = (props) => {
  // @ts-ignore
  const index = parseInt(props.params.index);

  return (
    <Suspense fallback={<RingLoader loading color="white" size={48} />}>
      <Visualizer index={index} />
    </Suspense>
  );
};

export default Visualizers;

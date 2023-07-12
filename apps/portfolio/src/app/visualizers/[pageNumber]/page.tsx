"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SquareLoader from "react-spinners/SquareLoader";

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
const VisualizerSeven = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerSeven),
  { ssr: false }
);
// const VisualizerEight = dynamic(
//   () => import("visualizers").then((mod) => mod.VisualizerEight),
//   { ssr: false }
// );

const Visualizer: React.FC<{
  pageNumber: number;
  fallback: React.ReactNode;
}> = ({ pageNumber, fallback }) => {
  switch (pageNumber) {
    case 1:
      return <VisualizerOne fallback={fallback} />;
    case 2:
      return <VisualizerTwo fallback={fallback} />;
    case 3:
      return <VisualizerThree fallback={fallback} />;
    case 4:
      return <VisualizerFour fallback={fallback} />;
    case 5:
      return <VisualizerFive fallback={fallback} />;
    case 6:
      return <VisualizerSix fallback={fallback} />;
    case 7:
      return <VisualizerSeven fallback={fallback} />;
    // case 8:
    //   return <VisualizerEight fallback={fallback} />;
    default:
      return null;
  }
};

const Visualizers: React.FC<Props> = (props) => {
  // @ts-ignore
  const pageNumber = parseInt(props.params.pageNumber);

  const fallback = (
    <div className="flex h-screen items-center justify-center">
      <SquareLoader loading color="white" />
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <Visualizer pageNumber={pageNumber} fallback={fallback} />
    </Suspense>
  );
};

export default Visualizers;

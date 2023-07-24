"use client";

import { extend } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import SquareLoader from "react-spinners/SquareLoader";

import { initializeUnmute } from "@/vendor/unmute";

// add <meshLineGeometry /> and <meshLineMaterial /> to the r3f scope
extend({ MeshLineGeometry, MeshLineMaterial });

const VisualizerOne = dynamic(() => import("@/visualizers/1"), { ssr: false });
const VisualizerTwo = dynamic(() => import("@/visualizers/2"), { ssr: false });
const VisualizerThree = dynamic(() => import("@/visualizers/3"), {
  ssr: false,
});
const VisualizerFour = dynamic(() => import("@/visualizers/4"), { ssr: false });
const VisualizerFive = dynamic(() => import("@/visualizers/5"), { ssr: false });
const VisualizerSix = dynamic(() => import("@/visualizers/6"), { ssr: false });
const VisualizerSeven = dynamic(() => import("@/visualizers/7"), {
  ssr: false,
});
const VisualizerEight = dynamic(() => import("@/visualizers/8"), {
  ssr: false,
});
const VisualizerNine = dynamic(() => import("@/visualizers/9"), {
  ssr: false,
});
const VisualizerTen = dynamic(() => import("@/visualizers/10"), {
  ssr: false,
});

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
    case 8:
      return <VisualizerEight fallback={fallback} />;
    case 9:
      return <VisualizerNine />;
    case 10:
      return <VisualizerTen />;
    default:
      return null;
  }
};

const Visualizers: React.FC<{ params: { pageNumber: string } }> = (props) => {
  const pageNumber = parseInt(props.params.pageNumber);

  const fallback = (
    <div className="flex h-screen items-center justify-center">
      <SquareLoader loading color="white" />
    </div>
  );

  useEffect(() => {
    const unmute = initializeUnmute();

    return () => {
      unmute.dispose();
    };
  }, []);

  return (
    <Suspense fallback={fallback}>
      <Visualizer pageNumber={pageNumber} fallback={fallback} />
    </Suspense>
  );
};

export default Visualizers;

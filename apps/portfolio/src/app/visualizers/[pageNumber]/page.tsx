"use client";

import { extend } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import SquareLoader from "react-spinners/SquareLoader";

import { initializeUnmute } from "@/vendor/unmute";

// add <meshLineGeometry /> and <meshLineMaterial /> to the r3f scope
extend({ MeshLineGeometry, MeshLineMaterial });

const VisualizerOne = dynamic(() => import("@/visualizers/01"), { ssr: false });
const VisualizerTwo = dynamic(() => import("@/visualizers/02"), { ssr: false });
const VisualizerThree = dynamic(() => import("@/visualizers/03"), {
  ssr: false,
});
const VisualizerFour = dynamic(() => import("@/visualizers/04"), {
  ssr: false,
});
const VisualizerFive = dynamic(() => import("@/visualizers/05"), {
  ssr: false,
});
const VisualizerSix = dynamic(() => import("@/visualizers/06"), { ssr: false });
const VisualizerSeven = dynamic(() => import("@/visualizers/07"), {
  ssr: false,
});
const VisualizerEight = dynamic(() => import("@/visualizers/08"), {
  ssr: false,
});
const VisualizerNine = dynamic(() => import("@/visualizers/09"), {
  ssr: false,
});
const VisualizerTen = dynamic(() => import("@/visualizers/10"), {
  ssr: false,
});
const VisualizerEleven = dynamic(() => import("@/visualizers/11"), {
  ssr: false,
});
const VisualizerTwelve = dynamic(() => import("@/visualizers/12"), {
  ssr: false,
});
const VisualizerThirteen = dynamic(() => import("@/visualizers/13"), {
  ssr: false,
});
const VisualizerFourteen = dynamic(() => import("@/visualizers/14"), {
  ssr: false,
});
const VisualizerFifteen = dynamic(() => import("@/visualizers/15"), {
  ssr: false,
});

const VisualizerScene: React.FC<{
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
      return <VisualizerNine fallback={fallback} />;
    case 10:
      return <VisualizerTen fallback={fallback} />;
    case 11:
      return <VisualizerEleven fallback={fallback} />;
    case 12:
      return <VisualizerTwelve fallback={fallback} />;
    case 13:
      return <VisualizerThirteen fallback={fallback} />;
    case 14:
      return <VisualizerFourteen fallback={fallback} />;
    case 15:
      return <VisualizerFifteen fallback={fallback} />;
    default:
      return null;
  }
};

const Visualizer: React.FC<{ params: { pageNumber: string } }> = (props) => {
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
      <VisualizerScene pageNumber={pageNumber} fallback={fallback} />
    </Suspense>
  );
};

export default Visualizer;

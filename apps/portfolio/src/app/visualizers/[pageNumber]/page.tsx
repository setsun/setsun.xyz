"use client";

import { extend } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import SquareLoader from "react-spinners/SquareLoader";

import { Pagination } from "@/components/VisualizerCanvas";
import { initializeUnmute } from "@/vendor/unmute";

// add <meshLineGeometry /> and <meshLineMaterial /> to the r3f scope
extend({ MeshLineGeometry, MeshLineMaterial });

const TOTAL_PUBLIC_PAGES = 14;

const VisualizerOne = dynamic(() => import("@/projects/visualizers/01"), {
  ssr: false,
});
const VisualizerTwo = dynamic(() => import("@/projects/visualizers/02"), {
  ssr: false,
});
const VisualizerThree = dynamic(() => import("@/projects/visualizers/03"), {
  ssr: false,
});
const VisualizerFour = dynamic(() => import("@/projects/visualizers/04"), {
  ssr: false,
});
const VisualizerFive = dynamic(() => import("@/projects/visualizers/05"), {
  ssr: false,
});
const VisualizerSix = dynamic(() => import("@/projects/visualizers/06"), {
  ssr: false,
});
const VisualizerSeven = dynamic(() => import("@/projects/visualizers/07"), {
  ssr: false,
});
const VisualizerEight = dynamic(() => import("@/projects/visualizers/08"), {
  ssr: false,
});
const VisualizerNine = dynamic(() => import("@/projects/visualizers/09"), {
  ssr: false,
});
const VisualizerTen = dynamic(() => import("@/projects/visualizers/10"), {
  ssr: false,
});
const VisualizerEleven = dynamic(() => import("@/projects/visualizers/11"), {
  ssr: false,
});
const VisualizerTwelve = dynamic(() => import("@/projects/visualizers/12"), {
  ssr: false,
});
const VisualizerThirteen = dynamic(() => import("@/projects/visualizers/13"), {
  ssr: false,
});
const VisualizerFourteen = dynamic(() => import("@/projects/visualizers/14"), {
  ssr: false,
});
const VisualizerFifteen = dynamic(() => import("@/projects/visualizers/15"), {
  ssr: false,
});

const VisualizerScene: React.FC<{
  pagination: Pagination;
  fallback: React.ReactNode;
}> = ({ pagination, fallback }) => {
  const { currentPage } = pagination;

  switch (currentPage) {
    case 1:
      return <VisualizerOne fallback={fallback} pagination={pagination} />;
    case 2:
      return <VisualizerTwo fallback={fallback} pagination={pagination} />;
    case 3:
      return <VisualizerThree fallback={fallback} pagination={pagination} />;
    case 4:
      return <VisualizerFour fallback={fallback} pagination={pagination} />;
    case 5:
      return <VisualizerFive fallback={fallback} pagination={pagination} />;
    case 6:
      return <VisualizerSix fallback={fallback} pagination={pagination} />;
    case 7:
      return <VisualizerSeven fallback={fallback} pagination={pagination} />;
    case 8:
      return <VisualizerEight fallback={fallback} pagination={pagination} />;
    case 9:
      return <VisualizerNine fallback={fallback} pagination={pagination} />;
    case 10:
      return <VisualizerTen fallback={fallback} pagination={pagination} />;
    case 11:
      return <VisualizerEleven fallback={fallback} pagination={pagination} />;
    case 12:
      return <VisualizerTwelve fallback={fallback} pagination={pagination} />;
    case 13:
      return <VisualizerThirteen fallback={fallback} pagination={pagination} />;
    case 14:
      return <VisualizerFourteen fallback={fallback} pagination={pagination} />;
    case 15:
      return <VisualizerFifteen fallback={fallback} pagination={pagination} />;
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

  const pagination = {
    currentPage: pageNumber,
    totalPages: TOTAL_PUBLIC_PAGES,
  };

  return (
    <Suspense fallback={fallback}>
      <VisualizerScene pagination={pagination} fallback={fallback} />
    </Suspense>
  );
};

export default Visualizer;

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

const Components = [
  dynamic(() => import("@/projects/visualizers/01"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/02"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/03"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/04"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/05"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/06"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/07"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/08"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/09"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/10"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/11"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/12"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/13"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/14"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/15"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/visualizers/16"), {
    ssr: false,
  }),
];

const VisualizerDisplay: React.FC<{
  pagination: Pagination;
  fallback: React.ReactNode;
}> = ({ pagination, fallback }) => {
  const { currentPage } = pagination;
  const index = currentPage - 1;
  const Component = Components[index];

  if (!Component) return null;

  return <Component fallback={fallback} pagination={pagination} />;
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
      <VisualizerDisplay pagination={pagination} fallback={fallback} />
    </Suspense>
  );
};

export default Visualizer;

"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SquareLoader from "react-spinners/SquareLoader";

const Components = [
  dynamic(() => import("@/projects/data-explorations/01"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/data-explorations/02"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/data-explorations/03"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/data-explorations/04"), {
    ssr: false,
  }),
];

const DataExplorationDisplay: React.FC<{
  pageNumber: number;
  fallback: React.ReactNode;
}> = ({ pageNumber, fallback }) => {
  const index = pageNumber - 1;
  const Component = Components[index];

  if (!Component) return null;

  return <Component />;
};

const DataExploration: React.FC<{ params: { pageNumber: string } }> = (
  props,
) => {
  const pageNumber = parseInt(props.params.pageNumber);

  const fallback = (
    <div className="flex h-screen items-center justify-center">
      <SquareLoader loading color="white" />
    </div>
  );
  return (
    <Suspense fallback={fallback}>
      <DataExplorationDisplay pageNumber={pageNumber} fallback={fallback} />
    </Suspense>
  );
};

export default DataExploration;

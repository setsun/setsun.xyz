"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SquareLoader from "react-spinners/SquareLoader";

const DataExplorationOne = dynamic(
  () => import("@/projects/data-explorations/01"),
  {
    ssr: false,
  },
);
const DataExplorationTwo = dynamic(
  () => import("@/projects/data-explorations/02"),
  {
    ssr: false,
  },
);
const DataExplorationThree = dynamic(
  () => import("@/projects/data-explorations/03"),
  {
    ssr: false,
  },
);

const DataExplorationDisplay: React.FC<{
  pageNumber: number;
  fallback: React.ReactNode;
}> = ({ pageNumber, fallback }) => {
  switch (pageNumber) {
    case 1:
      return <DataExplorationOne />;
    case 2:
      return <DataExplorationTwo />;
    case 3:
      return <DataExplorationThree />;
    default:
      return null;
  }
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

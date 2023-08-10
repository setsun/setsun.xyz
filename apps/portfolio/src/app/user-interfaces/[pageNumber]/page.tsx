"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SquareLoader from "react-spinners/SquareLoader";

const Components = [
  dynamic(() => import("@/projects/user-interfaces/01"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/user-interfaces/02"), {
    ssr: false,
  }),
  dynamic(() => import("@/projects/user-interfaces/03"), {
    ssr: false,
  }),
];

const UserInterfaceDisplay: React.FC<{
  pageNumber: number;
  fallback: React.ReactNode;
}> = ({ pageNumber, fallback }) => {
  const index = pageNumber - 1;
  const Component = Components[index];

  if (!Component) return null;

  return <Component />;
};

const UserInterface: React.FC<{ params: { pageNumber: string } }> = (props) => {
  const pageNumber = parseInt(props.params.pageNumber);

  const fallback = (
    <div className="flex h-screen items-center justify-center">
      <SquareLoader loading color="white" />
    </div>
  );
  return (
    <Suspense fallback={fallback}>
      <UserInterfaceDisplay pageNumber={pageNumber} fallback={fallback} />
    </Suspense>
  );
};

export default UserInterface;

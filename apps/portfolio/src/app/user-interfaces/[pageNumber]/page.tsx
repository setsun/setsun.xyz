"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SquareLoader from "react-spinners/SquareLoader";

const UserInterfaceOne = dynamic(
  () => import("@/projects/user-interfaces/01"),
  {
    ssr: false,
  },
);
const UserInterfaceTwo = dynamic(
  () => import("@/projects/user-interfaces/02"),
  {
    ssr: false,
  },
);
const UserInterfaceThree = dynamic(
  () => import("@/projects/user-interfaces/03"),
  {
    ssr: false,
  },
);

const UserInterfaceDisplay: React.FC<{
  pageNumber: number;
  fallback: React.ReactNode;
}> = ({ pageNumber, fallback }) => {
  switch (pageNumber) {
    case 1:
      return <UserInterfaceOne />;
    case 2:
      return <UserInterfaceTwo />;
    case 3:
      return <UserInterfaceThree />;
    default:
      return null;
  }
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

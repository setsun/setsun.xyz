"use client";

import dynamic from "next/dynamic";

const ShaderOne = dynamic(() => import("@/visualizers/9"), { ssr: false });
const ShaderTwo = dynamic(() => import("@/visualizers/10"), { ssr: false });

const Shader: React.FC<{
  pageNumber: number;
}> = ({ pageNumber }) => {
  switch (pageNumber) {
    case 1:
      return <ShaderOne />;
    case 2:
      return <ShaderTwo />;
    default:
      return null;
  }
};

const Shaders: React.FC<{ params: { pageNumber: string } }> = (props) => {
  const pageNumber = parseInt(props.params.pageNumber, 10);

  return (
    <>
      <Shader pageNumber={pageNumber} />
    </>
  );
};

export default Shaders;

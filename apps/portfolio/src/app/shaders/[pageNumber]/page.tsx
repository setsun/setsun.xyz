"use client";

import { Canvas } from "@react-three/fiber";

import ShaderPreview from "@/components/ShaderPreview";
import kaledioscope from "@/shaders/kaleidoscope.frag";

const Shader: React.FC<{
  pageNumber: number;
}> = ({ pageNumber }) => {
  switch (pageNumber) {
    case 1:
      return <ShaderPreview fragmentShader={kaledioscope} />;
    default:
      return null;
  }
};

const Shaders: React.FC<{ params: { pageNumber: string } }> = (props) => {
  const pageNumber = parseInt(props.params.pageNumber, 10);

  return (
    <Canvas style={{ height: "100vh" }}>
      <Shader pageNumber={pageNumber} />
    </Canvas>
  );
};

export default Shaders;

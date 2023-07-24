import { useShaderUniforms } from "veda-ui";

import planet from "./planet.frag";
import { Canvas } from "@react-three/fiber";

const PlanetShader = () => {
  const { meshRef, uniforms } = useShaderUniforms({});

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[2, 10]} />
      <shaderMaterial fragmentShader={planet} uniforms={uniforms} />
    </mesh>
  );
};

const Visualizer = () => {
  return (
    <>
      <Canvas style={{ height: "100vh" }}>
        <PlanetShader />
      </Canvas>
    </>
  );
};

export default Visualizer;

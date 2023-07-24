import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { useShaderUniforms } from "veda-ui";

import { useTurntable } from "@/hooks/useTurntable";

import planetFragmentShader from "./planet.frag";
import planetVertexShader from "./planet.vert";

const PlanetShader = () => {
  const { meshRef, uniforms } = useShaderUniforms({
    uniforms: {
      u_color_a: { value: new Color("#ff0000") },
      u_color_b: { value: new Color("#ff4d00") },
      u_color_c: { value: new Color("#ff6700") },
      u_color_d: { value: new Color("#ff8100") },
    },
  });

  const turntableRef = useTurntable({ speed: 0.001 });

  return (
    <group ref={turntableRef}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[2, 10]} />
        <shaderMaterial
          fragmentShader={planetFragmentShader}
          vertexShader={planetVertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
};

const Visualizer = () => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <PlanetShader />
    </Canvas>
  );
};

export default Visualizer;

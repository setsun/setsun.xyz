import React from "react";
import { Canvas } from "@react-three/fiber";

const fragmentShader = /* glsl */ `

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

const vertexShader = /* glsl */ `

void main() {

}
`;

const Shader = () => {
  return (
    <Canvas>
      <mesh>
        <planeBufferGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          wireframe
        />
      </mesh>
    </Canvas>
  );
};

export default Shader;

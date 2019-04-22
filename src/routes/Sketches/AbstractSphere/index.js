import * as THREE from 'three';
import React, { useRef } from 'react';
import { useSpring, a } from 'react-spring/three';
import { Canvas, useRender, useThree } from 'react-three-fiber';

const CirclePulse = ({ position, theta }) => {
  const ref = useRef();

  useRender(() => {
    theta += 0.05;

    const scale = Math.cos(theta);
    const geometry = ref.current;

    geometry.scale.set(scale, scale, scale);
  });

  return (
    <a.mesh ref={ref} position={position}>
      <ringGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="white" transparent />
    </a.mesh>
  );
};

CirclePulse.defaultProps = {
  position: [0, 0, 0],
  theta: 0,
};

const AbstractSphere = () => {
  return (
    <Canvas style={{ background: 'black' }}>
      <ambientLight color="white" />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />

      <a.mesh>
        {[...new Array(8)].map((_, i) => (
          <CirclePulse position={[0, 0.25 * i, 0]} theta={0.25 * i} key={i} />
        ))}
      </a.mesh>
    </Canvas>
  );
};

export default AbstractSphere;

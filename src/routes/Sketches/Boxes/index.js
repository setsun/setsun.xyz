import * as THREE from 'three';
import React, { useRef } from 'react';
import { useSpring, a } from 'react-spring/three';
import { Canvas, useRender, useThree } from 'react-three-fiber';

const Box = ({ position, theta }) => {
  const ref = useRef();

  useRender(() => {
    theta += 0.05;

    const scale = Math.cos(theta);
    const geometry = ref.current;

    geometry.scale.set(scale, scale, scale);
  });

  return (
    <a.mesh ref={ref} position={position}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="red" transparent />
    </a.mesh>
  );
};

const Boxes = () => {
  return (
    <Canvas style={{ background: 'black' }}>
      <ambientLight color="white" />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />

      <a.mesh>
        {[...new Array(20)].map((_, i) => (
          <React.Fragment key={i}>
            <Box position={[0, 1.25 * i, 0]} theta={1} />
            <Box position={[0, -1.25 * i, 0]} theta={1} />
            <Box position={[1.25 * i, 0, 0]} theta={1} />
            <Box position={[-1.25 * i, 0, 0]} theta={1} />
            <Box position={[1.25 * i, 1.25 * i, 0]} theta={1} />
            <Box position={[-1.25 * i, 1.25 * i, 0]} theta={1} />
            <Box position={[-1.25 * i, -1.25 * i, 0]} theta={1} />
            <Box position={[1.25 * i, -1.25 * i, 0]} theta={1} />
          </React.Fragment>
        ))}
      </a.mesh>
    </Canvas>
  );
};

export default Boxes;

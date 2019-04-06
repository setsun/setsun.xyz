import * as THREE from 'three';
import React, {
  useState,
  useRef,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useSpring, a } from 'react-spring/three';
import { Canvas, useRender, useThree } from 'react-three-fiber';

function Circle(position) {
  let ref = useRef();
  let theta = 0;

  useRender(() => {
    theta += 0.05;

    const scale = Math.cos(theta);
    const circle = ref.current;

    circle.scale.set(scale, scale, scale);
  });

  return (
    <a.mesh ref={ref} position={position}>
      <circleGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="grey" transparent />
    </a.mesh>
  );
}

export default function PulsingSphere() {
  return (
    <>
      <Canvas style={{ background: '#272727' }}>
        <ambientLight color="lightblue" />
        <pointLight color="white" intensity={1} position={[10, 10, 10]} />
        <Circle position={[0, 0, 0]} />
        <Circle position={[0.1, 0, 0]} />
        <Circle position={[0.2, 0, 0]} />
        <Circle position={[0.3, 0, 0]} />
      </Canvas>
    </>
  );
}

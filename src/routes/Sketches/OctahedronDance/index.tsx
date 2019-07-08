import * as THREE from 'three';
import React, { useRef } from 'react';
import { a } from 'react-spring/three';
import { Canvas, useRender } from 'react-three-fiber';

function Octahedron({ position, theta, animate }) {
  const ref = useRef<THREE.Mesh>();

  useRender(() => {
    if (animate) {
      theta += 0.05;

      const scale = Math.cos(theta);
      const octahedron = ref.current;

      octahedron.scale.set(scale, scale, scale);
    }
  });

  return (
    <a.mesh ref={ref} position={position}>
      <octahedronGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="grey" transparent />
    </a.mesh>
  );
}

Octahedron.defaultProps = {
  theta: 0,
  position: [0, 0, 0],
  animate: true,
};

function BaseOctahedronDance() {
  const group = useRef<THREE.Mesh>();
  let theta = 0;

  useRender(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)));
    const s = Math.cos(THREE.Math.degToRad(theta * 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });

  return (
    <a.mesh ref={group}>
      <Octahedron position={[0, 0, 0]} animate={false} />
      <Octahedron position={[0, 0.1, 0]} theta={0.5} />
      <Octahedron position={[0, 0.2, 0]} theta={0.5} />
      <Octahedron position={[0, 0.3, 0]} theta={0.5} />
      <Octahedron position={[0, -0.1, 0]} theta={0.25} />
      <Octahedron position={[0, -0.2, 0]} theta={0.25} />
      <Octahedron position={[0, -0.3, 0]} theta={0.25} />
      <Octahedron position={[0.1, 0, 0]} theta={0.75} />
      <Octahedron position={[0.2, 0, 0]} theta={0.75} />
      <Octahedron position={[0.3, 0, 0]} theta={0.75} />
      <Octahedron position={[-0.1, 0, 0]} theta={1} />
      <Octahedron position={[-0.2, 0, 0]} theta={1} />
      <Octahedron position={[-0.3, 0, 0]} theta={1} />
    </a.mesh>
  );
}

export default function OctahedronDance() {
  return (
    <Canvas style={{ background: '#272727' }}>
      <ambientLight color="lightblue" />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />
      <BaseOctahedronDance />
    </Canvas>
  );
}

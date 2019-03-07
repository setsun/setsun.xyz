import * as React from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';

const Sketches = () => {
  const color = 'blue';
  const vertices = [[-1, 0, 0], [0, 1, 0], [1, 0, 0]];

  return (
    <Canvas>
      <group>
        <line
          position={[10, 20, 30]}
          rotation={[THREE.Math.degToRad(90), 0, 0]}
        >
          <geometry
            name="geometry"
            vertices={vertices.map(v => new THREE.Vector3(...v))}
            onUpdate={self => (self.verticesNeedUpdate = true)}
          />
          <lineBasicMaterial name="material" color="blue" />
        </line>
        <mesh>
          <octahedronGeometry name="geometry" />
          <meshStandardMaterial
            name="material"
            color="grey"
            opacity={0.5}
            transparent
          />
        </mesh>
      </group>
    </Canvas>
  );
};

export default Sketches;

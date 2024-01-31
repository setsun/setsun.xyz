import { Center, Line, OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { noise } from "maath/random";
import { useRef } from "react";
import { BufferGeometry, DoubleSide, Triangle, Vector2, Vector3 } from "three";
import { GeometryUtils, Line2 } from "three-stdlib";

import { Pagination } from "@/components/VisualizerCanvas";
import { useTurntable } from "@/hooks/useTurntable";

const NoiseLine = () => {
  const frequency = 2;
  const amplitude = 2;
  const geometryRef = useRef<BufferGeometry>(null!);

  // on each frame animation
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    const points = new Array(100).fill(undefined).map((_, index) => {
      const x = (index - 100) / 5;
      const y = noise.perlin2(x * frequency, elapsedTime) * amplitude;

      return new Vector2(x, y);
    });

    geometryRef?.current?.setFromPoints(points);
  });

  return (
    <line>
      <bufferGeometry attach="geometry" ref={geometryRef} />
      <lineBasicMaterial attach="material" color="#eee99f" />
    </line>
  );
};

const TriangleGeometry = ({
  position = [0, 0, 0],
  text,
}: {
  position?: [number, number, number];
  text: string;
}) => {
  const v1 = new Vector3(0, 0, 0);
  const v2 = new Vector3(1, 0, 0);
  const v3 = new Vector3(1, 1, 0);

  const geometry = new BufferGeometry().setFromPoints([v1, v2, v3]);

  return (
    <group position={position}>
      <mesh geometry={geometry} rotation={[0, 0, -Math.PI / 8]}>
        <meshBasicMaterial color="#a7e7e8" side={DoubleSide} />
      </mesh>

      <Line
        color="#a7e7e8"
        lineWidth={1.5}
        points={[
          [0, -0.5, 0],
          [0, 0.5, 0],
        ]}
      />

      <Text position={[2, 0, 0]}>{text}</Text>
    </group>
  );
};

const MainScene = () => {
  const turntable1 = useTurntable({ speed: 0.0025, axis: "x" });
  const turntable2 = useTurntable({ speed: 0.02, axis: "y" });
  const turntable3 = useTurntable({ speed: 0.02, axis: "y" });

  return (
    <Center>
      <group position={[0, 0, 0]}>
        <TriangleGeometry text="1" position={[0, 0, 5]} />
        <TriangleGeometry text="2" position={[0, 0, 10]} />
        <TriangleGeometry text="3" position={[0, 0, 15]} />
        <TriangleGeometry text="4" position={[0, 0, 20]} />
        <TriangleGeometry text="5" position={[0, 0, 25]} />
        <TriangleGeometry text="6" position={[0, 0, 30]} />

        <TriangleGeometry text="1" position={[0, 0, -5]} />
        <TriangleGeometry text="2" position={[0, 0, -10]} />
        <TriangleGeometry text="3" position={[0, 0, -15]} />
        <TriangleGeometry text="4" position={[0, 0, -20]} />
        <TriangleGeometry text="5" position={[0, 0, -25]} />
        <TriangleGeometry text="6" position={[0, 0, -30]} />

        <group>
          <mesh>
            <sphereGeometry args={[8, 32, 32]} />
            <meshBasicMaterial color="#b65a39" wireframe />
          </mesh>

          <mesh ref={turntable1} rotation={[0, Math.PI / 4, Math.PI / 4]}>
            <cylinderGeometry args={[5, 5, 1, 32, 32, true]} />
            <meshBasicMaterial color="#b65a39" wireframe />
          </mesh>
        </group>

        <group ref={turntable2}>
          <mesh position={[0, -0.5, 0]}>
            <coneGeometry args={[0.5, 1, 16, 16, true]} />
            <meshBasicMaterial color="#a7e7e8" wireframe />
          </mesh>

          <mesh position={[0, 0.5, 0]} rotation={[0, 0, -Math.PI]}>
            <coneGeometry args={[0.5, 1, 16, 16, true]} />
            <meshBasicMaterial color="#a7e7e8" wireframe />
          </mesh>
        </group>

        <group ref={turntable3} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.05, 16, 16, true]} />
            <meshBasicMaterial color="#a7e7e8" wireframe />
          </mesh>

          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.05, 16, 16, true]} />
            <meshBasicMaterial color="#a7e7e8" wireframe />
          </mesh>
        </group>

        <group>
          <mesh position={[0, -16, 0]}>
            <coneGeometry args={[2, 30, 32, 32, true]} />
            <meshBasicMaterial color="#a7e7e8" wireframe />
          </mesh>

          <mesh position={[0, 16, 0]} rotation={[0, 0, -Math.PI]}>
            <coneGeometry args={[2, 30, 32, 32, true]} />
            <meshBasicMaterial color="#a7e7e8" wireframe />
          </mesh>
        </group>

        <Line
          color="#a7e7e8"
          lineWidth={1.5}
          points={[
            [-1000, 0, 0],
            [1000, 0, 0],
          ]}
        />

        <Line
          color="#a7e7e8"
          lineWidth={1.5}
          points={[
            [0, 0, -1000],
            [0, 0, 1000],
          ]}
        />

        <group rotation={[0, Math.PI / 2, 0]} position={[0, 1, 0]}>
          <NoiseLine />
        </group>
      </group>
    </Center>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <div className="h-screen">
      <Canvas
        camera={{
          type: "PerspectiveCamera",
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.01,
          far: 5000,
          position: [-30, 0, 0],
        }}
      >
        <OrbitControls />

        <MainScene />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Visualizer;

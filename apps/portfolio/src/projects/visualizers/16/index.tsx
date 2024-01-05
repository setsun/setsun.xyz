import { Center, Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import { noise } from "maath/random";
import { useRef } from "react";
import { Vector3 } from "three";
import { GeometryUtils, Line2 } from "three-stdlib";

import { Pagination } from "@/components/VisualizerCanvas";
import { useTurntable } from "@/hooks/useTurntable";

function getHilbertPoints(delta: number = 0): [number, number, number][] {
  return GeometryUtils.hilbert3D(new Vector3(0), 10, 3).map((p) => [
    p.x + noise.simplex3(p.x, p.y, p.z + delta) * 0.3,
    p.y + noise.simplex3(p.x, p.y, p.z + delta) * 0.3,
    p.z + noise.simplex3(p.x, p.y, p.z + delta) * 0.3,
  ]);
}

const NoisyCurve = ({
  color,
  lineWidth,
}: {
  color: string;
  lineWidth: number;
}) => {
  const lineRef = useRef<Line2>(null!);

  return (
    <Line
      ref={lineRef}
      color={color}
      lineWidth={lineWidth}
      points={getHilbertPoints()}
    />
  );
};

const MainScene = () => {
  const turntable1 = useTurntable({ speed: 0.001, axis: "x" });
  const turntable2 = useTurntable({ speed: 0.001, axis: "y" });
  const turntable3 = useTurntable({ speed: 0.001, axis: "z" });

  return (
    <Center>
      <group position={[0, 0, 0]} rotation={[Math.PI / 4, -Math.PI / 4, 0]}>
        <mesh ref={turntable1}>
          <NoisyCurve color="white" lineWidth={0.5} />
        </mesh>
        <mesh ref={turntable2}>
          <NoisyCurve color="white" lineWidth={0.1} />
        </mesh>
        <mesh ref={turntable3}>
          <NoisyCurve color="white" lineWidth={0.1} />
        </mesh>
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
      <Canvas camera={{
        type: "PerspectiveCamera",
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.01,
        far: 5000,
        position: [-30, 0, 0]
      }}>
        <OrbitControls />

        <MainScene />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  )
};

export default Visualizer;

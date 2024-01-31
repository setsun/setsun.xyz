import { Base, Geometry, Subtraction } from "@react-three/csg";
import { MarchingCube, MarchingCubes } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Suspense, useRef } from "react";
import {
  AudioAnalyser,
  BoxGeometry,
  Color,
  CylinderGeometry,
  Mesh,
  Vector3,
} from "three";

import { ThreeCanvas } from "@/components/ThreeCanvas";
import { useTurntable } from "@/hooks/useTurntable";

const box = new BoxGeometry();
const cyl = new CylinderGeometry(0.6, 0.6, 1.5, 32);

function OpenBox() {
  const turntableRef = useTurntable({ speed: 0.0025 });

  return (
    <mesh receiveShadow castShadow ref={turntableRef}>
      <Geometry computeVertexNormals>
        <Base name="base" geometry={box} scale={[1.5, 1.5, 1.5]} />
        <Subtraction name="cavity" geometry={box} scale={[1.35, 1.35, 1.35]} />
        <Subtraction position={[0, 0, 0]} geometry={cyl} />
        <Subtraction
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          geometry={cyl}
        />
        <Subtraction
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          geometry={cyl}
        />
      </Geometry>

      <meshNormalMaterial wireframe />
    </mesh>
  );
}

interface MetaBallProps {
  color: string;
  position: Vector3;
  audioAnalyzer: AudioAnalyser;
}

function MetaBall({ color, position, audioAnalyzer, ...props }: MetaBallProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null!);
  const vec = new Vector3();

  useFrame((state, delta) => {
    const averageFrequency = audioAnalyzer.getAverageFrequency();
    const multiplier = averageFrequency > 30 ? -1 : 1;
    const modifier = (averageFrequency / 100) * 0.15;

    if (!rigidBodyRef.current) return;

    // todo: tinker with impulse after @react-three/rapier is updated
    rigidBodyRef.current.applyImpulse(
      vec
        .copy(rigidBodyRef.current.translation() as Vector3)
        .normalize()
        .multiplyScalar(delta * multiplier * modifier),
      true,
    );
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      linearDamping={4}
      angularDamping={0.95}
      type="dynamic"
      position={position}
      {...props}
    >
      <MarchingCube
        strength={0.35}
        subtract={6}
        color={color as unknown as Color}
      />
      <BallCollider args={[0.1]} />
    </RigidBody>
  );
}

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  // lol fix this later
  const ref1 = useRef<Mesh>(null!);
  const ref2 = useRef<Mesh>(null!);
  const ref3 = useRef<Mesh>(null!);
  const ref4 = useRef<Mesh>(null!);
  const ref5 = useRef<Mesh>(null!);
  const ref6 = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() / 2;

    const mesh1 = ref1.current;
    const mesh2 = ref2.current;
    const mesh3 = ref3.current;
    const mesh4 = ref4.current;
    const mesh5 = ref5.current;
    const mesh6 = ref6.current;

    if (!mesh1 || !mesh2 || !mesh3 || !mesh4 || !mesh5 || !mesh6) return;

    mesh1.position.set(
      Math.sin(elapsedTime) * -0.5,
      0,
      Math.cos(elapsedTime) * 0.5,
    );
    mesh2.position.set(
      0,
      Math.cos(elapsedTime) * 0.5,
      Math.sin(elapsedTime) * 0.5,
    );
    mesh3.position.set(
      Math.sin(elapsedTime) * 0.5,
      Math.cos(elapsedTime) * 0.5,
      0,
    );
    mesh4.position.set(
      Math.sin(elapsedTime) * -0.5,
      0,
      Math.cos(elapsedTime) * 0.5,
    );
    mesh5.position.set(
      Math.cos(elapsedTime) * 0.5,
      0,
      Math.sin(elapsedTime) * -0.5,
    );
    mesh6.position.set(
      Math.cos(elapsedTime) * -0.5,
      Math.sin(elapsedTime) * 0.5,
      0,
    );
  });

  return (
    <Suspense>
      <OpenBox />

      <Physics gravity={[0, 2, 0]}>
        <MarchingCubes
          resolution={64}
          maxPolyCount={12_000}
          enableUvs={false}
          enableColors
        >
          {/** @ts-expect-error color mismatch */}
          <MarchingCube color="#880ED4" position={[0, 0, 0.5]} ref={ref1} />
          {/** @ts-expect-error color mismatch */}
          <MarchingCube color="#880ED4" position={[0, 0.5, 0]} ref={ref2} />
          {/** @ts-expect-error color mismatch */}
          <MarchingCube color="#880ED4" position={[0.5, 0, 0]} ref={ref3} />
          {/** @ts-expect-error color mismatch */}
          <MarchingCube color="#880ED4" position={[0, 0, -0.5]} ref={ref4} />
          {/** @ts-expect-error color mismatch */}
          <MarchingCube color="#880ED4" position={[0, -0.5, 0]} ref={ref5} />
          {/** @ts-expect-error color mismatch */}
          <MarchingCube color="#880ED4" position={[-0.5, 0, 0]} ref={ref6} />

          <MetaBall
            color="#880ED4"
            position={new Vector3(1, 1, 0.5)}
            audioAnalyzer={analyzer}
          />
          <MetaBall
            color="#880ED4"
            position={new Vector3(-1, -1, -0.5)}
            audioAnalyzer={analyzer}
          />
          <MetaBall
            color="#880ED4"
            position={new Vector3(1, 1, 0.5)}
            audioAnalyzer={analyzer}
          />
          <MetaBall
            color="#880ED4"
            position={new Vector3(-1.25, -1.25, -0.5)}
            audioAnalyzer={analyzer}
          />
          <MetaBall
            color="#880ED4"
            position={new Vector3(1.5, 1.5, 0.5)}
            audioAnalyzer={analyzer}
          />
          <MetaBall
            color="#880ED4"
            position={new Vector3(-1.5, -1.5, -0.5)}
            audioAnalyzer={analyzer}
          />

          <meshStandardMaterial vertexColors roughness={0} />
        </MarchingCubes>
      </Physics>
    </Suspense>
  );
};

const Visualizer: React.FC<{
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <ThreeCanvas
      audioUrl="https://www.setsun.xyz/audio/Ghost_Voices_Remix.mp3"
      camera={{
        position: [0, 0, -2.25],
      }}
      hasOrbitControls
      {...props}
    >
      {({ analyzer, isPlaying }) => (
        <>
          <ambientLight intensity={1} />
          <directionalLight intensity={1} />
          <directionalLight
            intensity={10}
            position={[-10, -10, -10]}
            color="purple"
          />

          <MainScene analyzer={analyzer} isPlaying={isPlaying} />
        </>
      )}
    </ThreeCanvas>
  );
};

export default Visualizer;

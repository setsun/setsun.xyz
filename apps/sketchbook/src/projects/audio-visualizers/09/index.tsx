import {
  MeshDiscardMaterial,
  PerspectiveCamera as DreiPerspectiveCamera,
  Trail,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
  Scanline,
} from "@react-three/postprocessing";
import { useRef } from "react";
import {
  AudioAnalyser,
  CatmullRomCurve3,
  Group,
  MeshBasicMaterial,
  PerspectiveCamera,
  Vector2,
  Vector3,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import { ThreeCanvas } from "@/components/ThreeCanvas";
import { useShaderUniforms } from "@/hooks/useShaderUniforms";
import { clamp } from "@/utils/math";

import displaceTubeVertexShader from "./displace-tube.vert";
import { Spaceship } from "./Spaceship";

// calculate a path for a torus knot
const points = new Array(1000).fill(undefined).map((value, index) => {
  const p = 3;
  const q = 7;
  const theta = (index / 1000) * Math.PI * 2;
  const majorRadius = 300;
  const minorRadius = 250;

  const x =
    (majorRadius + minorRadius * Math.cos(p * theta)) * Math.cos(q * theta);

  const y =
    (majorRadius + minorRadius * Math.cos(p * theta)) * Math.sin(q * theta);

  const z = minorRadius * Math.sin(p * theta);

  return new Vector3(x, y, z);
});

// close the path, so it's a loop
points.push(points[0]);

const PATH = new CatmullRomCurve3(points);

const MIN_SPEED = 0.00003;
const MAX_SPEED = 0.0002;
const SPEED_GROWTH_FACTOR = 0.00005;
const SPEED_DECAY_FACTOR = -0.00005;

const MIN_FOV = 60;
const MAX_FOV = 120;
const FOV_GROWTH_FACTOR = -12;
const FOV_DECAY_FACTOR = 12;

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const percentageRef = useRef(0);
  const spaceshipRef = useRef<Group>(null!);

  const { meshRef, uniforms } = useShaderUniforms({});

  const currentSpeed = useRef(MIN_SPEED);

  useFrame(({ clock, camera }, delta) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const elapsedTime = clock.getElapsedTime();
    const averageFrequency = analyzer.getAverageFrequency();

    const speedModifier =
      averageFrequency > 0 ? SPEED_GROWTH_FACTOR : SPEED_DECAY_FACTOR;
    const fovModifier =
      averageFrequency > 0 ? FOV_GROWTH_FACTOR : FOV_DECAY_FACTOR;

    const nextSpeed = currentSpeed.current + speedModifier * delta;
    const nextFov = perspectiveCamera.fov + fovModifier * delta;

    currentSpeed.current = clamp(nextSpeed, MIN_SPEED, MAX_SPEED);
    perspectiveCamera.fov = clamp(nextFov, MIN_FOV, MAX_FOV);
    percentageRef.current += currentSpeed.current * delta * 120;

    const p1 = PATH.getPointAt(percentageRef.current % 1);
    const p2 = PATH.getPointAt((percentageRef.current + 0.01) % 1);

    // use counter to change offset percentage every x frames
    const offsetX = Math.sin(elapsedTime) * 0.5;
    const offsetY = Math.cos(elapsedTime) * 1;
    const offsetZ = Math.sin(elapsedTime) * 2.5;

    spaceshipRef.current.position.set(offsetX, offsetY, offsetZ);
    spaceshipRef.current.lookAt(
      new Vector3(
        camera.position.x + offsetX,
        camera.position.y + offsetY,
        camera.position.z + offsetZ
      )
    );

    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(p2);
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <DreiPerspectiveCamera fov={90} makeDefault>
        <group position={[0, 0, -15]}>
          <group ref={spaceshipRef}>
            <Spaceship rotation={[0, -Math.PI, 0]} />
            <Trail
              width={2}
              length={1}
              attenuation={(t) => t * t}
              color="white"
            >
              <mesh position={[0, -0.5, -1]}>
                <boxGeometry args={[1, 1]} />
                <MeshDiscardMaterial />
              </mesh>
            </Trail>
          </group>
        </group>
      </DreiPerspectiveCamera>

      <mesh ref={meshRef}>
        <tubeGeometry args={[PATH, 300, 50, 50, true]} />

        <CustomShaderMaterial
          baseMaterial={MeshBasicMaterial}
          color="white"
          transparent
          wireframe
          opacity={0.5}
          uniforms={uniforms}
          vertexShader={displaceTubeVertexShader}
        />
      </mesh>

      <EffectComposer>
        <Scanline density={20} />
        <ChromaticAberration
          radialModulation={false}
          modulationOffset={0.5}
          offset={new Vector2(0.0075, 0.0075)}
        />
      </EffectComposer>
    </>
  );
};

const Visualizer = () => (
  <ThreeCanvas audioUrl="https://www.setsun.xyz/audio/dashstar.mp3">
    {({ analyzer, isPlaying }) => (
      <MainScene analyzer={analyzer} isPlaying={isPlaying} />
    )}
  </ThreeCanvas>
);

export default Visualizer;

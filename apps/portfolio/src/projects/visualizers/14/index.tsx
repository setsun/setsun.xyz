import {
  Float,
  MeshDiscardMaterial,
  PerspectiveCamera,
  Trail,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
  Scanline,
} from "@react-three/postprocessing";
import clamp from "lodash.clamp";
import { useRef } from "react";
import {
  AudioAnalyser,
  CatmullRomCurve3,
  MeshBasicMaterial,
  Vector2,
  Vector3,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

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

points.push(points[0]);

const PATH = new CatmullRomCurve3(points);

const MIN_SPEED = 0.00003;
const MAX_SPEED = 0.0002;
const GROWTH_FACTOR = 0.0000005;
const DECAY_FACTOR = -0.001;

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const percentageRef = useRef(0);
  const spaceshipRef = useRef(null!);

  const { meshRef, uniforms } = useShaderUniforms({});

  const countRef = useRef(0);
  const currentSpeed = useRef(MIN_SPEED);

  useFrame(({ camera }) => {
    const averageFrequency = analyzer.getAverageFrequency();

    const modifier = averageFrequency > 0 ? GROWTH_FACTOR : DECAY_FACTOR;

    let nextSpeed = currentSpeed.current + modifier;

    currentSpeed.current = clamp(nextSpeed, MIN_SPEED, MAX_SPEED);

    percentageRef.current += currentSpeed.current;

    const p1 = PATH.getPointAt(percentageRef.current % 1);
    const p2 = PATH.getPointAt((percentageRef.current + 0.01) % 1);

    countRef.current++;

    // use counter to change offset percentage every x frames
    const offsetX = Math.sin(countRef.current / 60) * 0.5;
    const offsetY = Math.cos(countRef.current / 60) * 1;
    const offsetZ = Math.sin(countRef.current / 120) * 2.5;

    spaceshipRef.current.position.set(offsetX, offsetY, offsetZ);
    spaceshipRef.current.lookAt(
      new Vector3(
        camera.position.x + offsetX,
        camera.position.y + offsetY,
        camera.position.z + offsetZ,
      ),
    );

    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(p2);
  });

  return (
    <>
      <PerspectiveCamera makeDefault>
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
      </PerspectiveCamera>

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

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_14"
      audioProps={{
        url: "/audio/dashstar.mp3",
        name: "Knock2 - dashstar*",
        externalHref: "https://soundcloud.com/nightmoderecs/knock2-dashstar-1",
      }}
      {...props}
    >
      {({ analyzer, isPlaying }) => (
        <MainScene analyzer={analyzer} isPlaying={isPlaying} />
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

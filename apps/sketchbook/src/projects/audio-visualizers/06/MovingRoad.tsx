import { GradientTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useRef } from "react";
import { AudioAnalyser, Mesh, SpotLight, TextureLoader } from "three";

import CircleWaveform from "@/components/CircleWaveform";
import RadialBarFrequencyGraph from "@/components/RadialBarFrequencyGraph";

interface Props {
  width?: number;
  height?: number;
  widthSegments?: number;
  heightSegments?: number;
  audioAnalyzer: AudioAnalyser;
}

const MovingRoad = ({
  width = 1,
  height = 2,
  widthSegments = 24,
  heightSegments = 24,
  audioAnalyzer,
}: Props) => {
  const firstPlaneMesh = useRef<Mesh>(null);
  const secondPlaneMesh = useRef<Mesh>(null);
  const firstSpotlight = useRef<SpotLight>(null);
  const secondSpotlight = useRef<SpotLight>(null);

  firstSpotlight.current?.target.position.set(-0.25, 0.25, 0.25);
  secondSpotlight.current?.target.position.set(0.25, 0.25, 0.25);

  const [roadMap, roadDisplacementMap, roadMetalnessMap] = useLoader(
    // @ts-ignore
    TextureLoader,
    [
      "https://www.setsun.xyz/images/textures/road/map.png",
      "https://www.setsun.xyz/images/textures/road/displacementMap.png",
      "https://www.setsun.xyz/images/textures/road/metalnessMap.png",
    ]
  );

  useFrame((context) => {
    if (!firstPlaneMesh?.current || !secondPlaneMesh?.current) {
      return;
    }

    const elapsedTime = context.clock.getElapsedTime();

    firstPlaneMesh.current.position.z = (elapsedTime * 0.15) % 2;
    secondPlaneMesh.current.position.z = ((elapsedTime * 0.15) % 2) - 2;
  });

  return (
    <>
      <ambientLight color="#fff" intensity={10} />

      <spotLight
        ref={firstSpotlight}
        args={["#F222FF", 20, 25, Math.PI * 0.1, 0.25]}
        position={[0.5, 0.75, 2.2]}
      />

      <spotLight
        ref={secondSpotlight}
        args={["#F222FF", 20, 25, Math.PI * 0.1, 0.25]}
        position={[-0.5, 0.75, 2.2]}
      />

      <mesh position={[0, 0, -1.3]}>
        <RadialBarFrequencyGraph radius={0.5} audioAnalyzer={audioAnalyzer} />
      </mesh>

      <mesh position={[0, 0, -1.2]}>
        <CircleWaveform radius={0.75} audioAnalyzer={audioAnalyzer} />
        <CircleWaveform radius={0.95} audioAnalyzer={audioAnalyzer} />
        <CircleWaveform radius={1.15} audioAnalyzer={audioAnalyzer} />
        <CircleWaveform radius={1.35} audioAnalyzer={audioAnalyzer} />
      </mesh>

      <mesh position={[0, 0, -1.3]}>
        <circleGeometry args={[0.5, 100]} />
        <meshBasicMaterial fog={false}>
          <GradientTexture
            stops={[0, 0.5, 1]} // As many stops as you want
            colors={["#FAA834", "#A457AE", "#574DA4"]} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024
          />
        </meshBasicMaterial>
      </mesh>

      <mesh
        ref={firstPlaneMesh}
        position={[0, 0, 0.15]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[width, height, widthSegments, heightSegments]} />
        <meshStandardMaterial
          map={roadMap}
          displacementMap={roadDisplacementMap}
          metalnessMap={roadMetalnessMap}
          displacementScale={0.5}
          metalness={0.96}
          roughness={0.5}
        />
      </mesh>
      <mesh
        ref={secondPlaneMesh}
        position={[0, 0, 0.15 - height]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[width, height, widthSegments, heightSegments]} />
        <meshStandardMaterial
          map={roadMap}
          displacementMap={roadDisplacementMap}
          metalnessMap={roadMetalnessMap}
          displacementScale={0.5}
          metalness={0.96}
          roughness={0.5}
        />
      </mesh>

      {/* post-processing effects */}
      <EffectComposer>
        <Noise opacity={0.8} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export default MovingRoad;

import { useFrame } from "@react-three/fiber";
import {
  InstancedRigidBodies,
  RapierRigidBody,
  Physics,
} from "@react-three/rapier";
import { useRef, Suspense, useMemo } from "react";
import { Bloom, EffectComposer, GodRays } from "@react-three/postprocessing";
import { Displace, LayerMaterial } from "lamina";
import { Displace as DisplaceType } from "lamina/vanilla";
import clamp from "lodash.clamp";
import { AudioAnalyser, Vector3 } from "three";
import * as random from "maath/random";
import { GodRaysEffect } from "postprocessing";

import { useTurntable } from "@/hooks/useTurntable";
import VisualizerCanvas from "@/components/VisualizerCanvas";
import { AttractorSun, AttractorSunRefData } from "./AttractorSun";

const COUNT = 250;
const SUN_RADIUS = 6;
const CELL_RADIUS = 2;

const MainScene = ({
  analyzer,
  isPlaying,
}: {
  analyzer: AudioAnalyser;
  isPlaying: boolean;
}) => {
  const attractorSunRef = useRef<AttractorSunRefData>(null!);
  const rigidBodiesRef = useRef<RapierRigidBody[]>(null!);
  const displaceLayerRef = useRef<DisplaceType>(null!);
  const godraysRef = useRef<GodRaysEffect>(null!);

  const rigidBodyInstances = useMemo(() => {
    const instances = [];

    const p = random.onSphere(new Float32Array(COUNT * 3), {
      radius: SUN_RADIUS + CELL_RADIUS + 5,
    });

    for (let i = 0; i < COUNT; i++) {
      instances.push({
        position: new Vector3().fromArray(p, i * 3).toArray(),
        key: i,
      });
    }

    return instances;
  }, []);

  const turntableRef = useTurntable({ speed: 0.004 });

  useFrame(({ clock, camera }) => {
    const rigidBody = attractorSunRef.current?.rigidBody;

    if (!rigidBody) return;

    const modifier = clamp(analyzer.getAverageFrequency() / 100, 0, 5);

    const displacementModifier = 0.05 * modifier;

    // @ts-ignore
    displaceLayerRef.current.offset.add(
      new Vector3(
        displacementModifier,
        displacementModifier,
        displacementModifier
      )
    );

    rigidBody.setTranslation(
      {
        x: Math.sin(clock.getElapsedTime()) * 1.25,
        y: Math.sin(clock.getElapsedTime()) * 1.25,
        z: 0,
      },
      true
    );

    if (godraysRef.current?.godRaysMaterial) {
      godraysRef.current.godRaysMaterial.weight = clamp(
        analyzer.getAverageFrequency() / 150,
        0.8,
        1.05
      );
    }

    rigidBodiesRef.current.forEach((api, index) => {
      if (index > COUNT / 1.5) return;

      const translation = api.translation();
      const threshold = SUN_RADIUS;

      const xModifier = translation.x < 0 ? -modifier : modifier;
      const yModifier = translation.y < 0 ? -modifier : modifier;
      const zModifier = translation.z < 0 ? -modifier : modifier;

      const x = Math.abs(translation.x) < threshold ? yModifier * 25 : 0;
      const y = Math.abs(translation.y) < threshold ? zModifier * 25 : 0;
      const z = Math.abs(translation.z) < threshold ? xModifier * 25 : 0;

      // todo: tinker with impulse after @react-three/rapier is updated
      api.applyImpulse({ x, y, z }, true);
    });
  });

  return (
    <group ref={turntableRef}>
      <AttractorSun
        radius={SUN_RADIUS}
        position={[0, 0, 0]}
        color="red"
        range={250}
        strength={500}
        ref={attractorSunRef}
      />

      <InstancedRigidBodies ref={rigidBodiesRef} instances={rigidBodyInstances}>
        <instancedMesh args={[undefined, undefined, COUNT]}>
          <sphereGeometry args={[CELL_RADIUS, 24, 24]} />
          <LayerMaterial
            wireframe
            color="#8a8a8a"
            lighting="physical"
            transmission={0.5}
            roughness={0.5}
            thickness={2}
          >
            <Displace
              ref={displaceLayerRef}
              strength={0.5}
              offset={[0, 0, 0]}
              type="perlin"
            />
          </LayerMaterial>
        </instancedMesh>
      </InstancedRigidBodies>

      <EffectComposer>
        {attractorSunRef?.current?.sun && (
          <GodRays
            sun={attractorSunRef.current.sun}
            weight={1}
            decay={0.9}
            ref={godraysRef}
          />
        )}
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </group>
  );
};

const Visualizer: React.FC<{ fallback?: React.ReactNode }> = ({ fallback }) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_04"
      songProps={{
        url: "/audio/Bloodstream.mp3",
        name: "Ferry Corsten - Bloodstream",
        externalHref:
          "https://soundcloud.com/ferry-corsten/ferry-corsten-ruben-de-ronde",
      }}
      camera={{
        position: [0, 16, -16],
      }}
      fallback={fallback}
    >
      {({ analyzer, isPlaying }) => (
        <Suspense>
          <Physics>
            <ambientLight intensity={0.8} />
            <pointLight intensity={1} position={[0, 6, 0]} />
            <pointLight intensity={1} position={[0, 0, 0]} />
            <pointLight intensity={1} position={[0, -6, 0]} />

            <MainScene analyzer={analyzer} isPlaying={isPlaying} />
          </Physics>
        </Suspense>
      )}
    </VisualizerCanvas>
  );
};

export default Visualizer;

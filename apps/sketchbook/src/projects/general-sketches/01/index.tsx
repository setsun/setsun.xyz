import {
  Center,
  Environment,
  Float,
  Mask,
  MeshReflectorMaterial,
  useMask,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useMemo, useRef } from "react";
import {
  DoubleSide,
  Euler,
  MathUtils,
  MeshNormalMaterial,
  Vector3,
} from "three";

import { ThreeCanvas } from "@/components/ThreeCanvas";
import { useTurntable } from "@/hooks/useTurntable";
import { getLogarithmicCurve } from "@/utils/three";

import { SketchCat } from "./SketchCat";

const colors = ["#fbe555", "#fb9224", "#f45905", "#ffeed0", "#feff89"];

extend({ MeshLineMaterial, MeshLineGeometry });

interface PortalLineProps {
  curve: Vector3[];
}

const PortalLine: React.FC<PortalLineProps> = ({ curve }) => {
  const material = useRef<MeshLineMaterial>(null!);

  useFrame(({ camera }) => {
    material.current.uniforms.dashOffset.value -= 0.001;
  });

  return (
    <mesh>
      <meshLineGeometry
        attach="geometry"
        points={curve as unknown as number[]}
      />
      <meshLineMaterial
        ref={material}
        transparent
        depthTest={false}
        lineWidth={0.01}
        color={colors[Math.floor((colors.length - 1) * Math.random())]}
        dashArray={0.05}
        dashRatio={0.3}
      />
    </mesh>
  );
};

const PortalLines = () => {
  const getVariance = () => MathUtils.randFloat(0.5, 1);

  const curves = useMemo(
    () =>
      new Array(4).fill(undefined).map((_, i) => {
        return getLogarithmicCurve({
          linearCoefficient: 5,
          logarithmicCoefficient: 0.01 * getVariance(),
          zScale: 0,
        });
      }),
    []
  );

  return (
    <group>
      {curves.map((curve, i) => (
        <PortalLine key={i} curve={curve} />
      ))}
    </group>
  );
};

const MaskedContent = () => {
  const stencilOne = useMask(1);
  const stencilTwo = useMask(2);

  const customStenciledMaterialOne = new MeshNormalMaterial({
    ...stencilOne,
    wireframe: true,
  });

  return (
    <Center position={[0, 0.5, 0]}>
      <Float position={[0, -1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <SketchCat
          customMaterial={customStenciledMaterialOne}
          position={[0, 0.1, 0]}
        />
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1000, 1000, 1000, 1000]} />
          <meshNormalMaterial wireframe {...stencilOne} />
        </mesh>
      </Float>

      <Float position={[0, -1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <SketchCat stencil={stencilTwo} position={[0, 0.1, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1000, 1000, 1000, 1000]} />
          <MeshReflectorMaterial
            mirror={0.5}
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={50}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            side={DoubleSide}
            color="gray"
            metalness={0.5}
            {...stencilTwo}
          />
        </mesh>
      </Float>
    </Center>
  );
};

const MainScene = () => {
  const turntableRef = useTurntable({ speed: 0.006 });

  return (
    <group ref={turntableRef}>
      <Environment preset="city" />
      <Center>
        <PortalLines />
      </Center>

      <Mask id={1} position={[0, 0, 0.1]}>
        <circleGeometry args={[5, 64]} />
      </Mask>

      <Mask id={2} position={[0, 0, -0.1]} rotation={[0, -Math.PI, 0]}>
        <circleGeometry args={[5, 64]} />
      </Mask>

      <MaskedContent />
    </group>
  );
};

const Visualizer = () => {
  return (
    <ThreeCanvas
      audioUrl="https://www.setsun.xyz/audio/dashstar.mp3"
      camera={{
        position: [0, 0, 7.5],
        rotation: new Euler(
          -0.3959453296134719,
          -0.24111278576897252,
          -0.0994871453099729
        ),
      }}
      hasOrbitControls
    >
      {() => <MainScene />}
    </ThreeCanvas>
  );
};

export default Visualizer;

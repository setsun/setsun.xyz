import { useFBO } from "@react-three/drei";
import { createPortal, extend, useFrame } from "@react-three/fiber";
import { inBox } from "maath/random";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  DataTexture,
  FloatType,
  MathUtils,
  NearestFilter,
  OrthographicCamera,
  Points,
  RGBAFormat,
  Scene,
  ShaderMaterial,
} from "three";

import particlesFragmentShader from "./particles.frag";
import particlesVertexShader from "./particles.vert";
import simulationFragmentShader from "./simulation.frag";
import simulationVertexShader from "./simulation.vert";

// These objects are for offscreen rendering / simulating the particle movements
const getSimulationObjects = () => {
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);

  // A simple square geometry with custom uv and positions attributes, for us to
  // simulate the particles movements
  const positions = new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
  ]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

  return { scene, camera, positions, uvs };
};

const generateRandomData = (width: number, height: number) => {
  /**
   * We need to create a vec4, since the fragment shader typically expects a vec4
   * containing R, G, B, and A components to determine color.
   *
   * We will be storing the X, Y, and Z positon data in the first three
   * components instead.
   */
  const length = width * height * 4;
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const vectorStride = i * 4;

    const distance = Math.sqrt(Math.random() - 0.5) * 2.0;
    const theta = MathUtils.randFloatSpread(360);
    const phi = MathUtils.randFloatSpread(360);

    // store position data in the first three components
    data[vectorStride] = distance * Math.sin(theta) * Math.cos(phi);
    data[vectorStride + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[vectorStride + 2] = distance * Math.cos(theta);

    // The fourth component does not matter, but we assign it 1.0 anyway
    data[vectorStride + 3] = 1.0;
  }

  return data;
};

// The simulation material is used to store the position data for the particles, to eventually
// be rendered in the final material which will display the particles in those positions
class SimulationMaterial extends ShaderMaterial {
  constructor(size: number, frequency: number) {
    const positionsTexture = new DataTexture(
      generateRandomData(size, size),
      size,
      size,
      RGBAFormat,
      FloatType,
    );

    positionsTexture.needsUpdate = true;

    super({
      uniforms: {
        u_positions: { value: positionsTexture },
        u_frequency: { value: frequency },
        u_time: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }
}

extend({ SimulationMaterial });

interface Props {
  size?: number;
  frequency?: number;
}

const FBOParticles = ({ size = 128, frequency = 0.2 }: Props) => {
  const simulationMaterialRef = useRef<SimulationMaterial>(null!);
  const pointsRef = useRef<Points>(null!);
  const pointsUniforms = useMemo(() => {
    return {
      u_positions: { value: null },
      u_time: { value: 0 },
    };
  }, []);

  const { scene, camera, positions, uvs } = useMemo(
    () => getSimulationObjects(),
    [],
  );

  // Generate the intial positions for the particles
  const particlePositions = useMemo(() => {
    const length = size * size;
    const array = new Float32Array(length * 3);
    return inBox(array);
  }, [size]);

  const renderTarget = useFBO(size, size, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
    stencilBuffer: false,
    type: FloatType,
  });

  useFrame(({ gl, clock }) => {
    // set render target temporarily to the FBO
    gl.setRenderTarget(renderTarget);

    // simulate the particles
    gl.clear();
    gl.render(scene, camera);

    // reset render target back to the default
    gl.setRenderTarget(null);

    const pointsMaterial = pointsRef.current.material as ShaderMaterial;
    const simulationMaterial = simulationMaterialRef.current as ShaderMaterial;

    // read back the data from the FBO render target, and pass it to the
    // points material to be rendered for real
    pointsMaterial.uniforms.u_positions.value = renderTarget.texture;

    // update the time for both material uniforms
    pointsMaterial.uniforms.u_time.value = clock.getElapsedTime();
    simulationMaterial.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <>
      {createPortal(
        <mesh>
          {/* @ts-ignore */}
          <simulationMaterial
            ref={simulationMaterialRef}
            args={[size, frequency]}
          />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={positions}
              count={positions.length / 3}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              array={uvs}
              count={uvs.length / 2}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene,
      )}

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particlePositions}
            count={particlePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={AdditiveBlending}
          depthWrite={false}
          fragmentShader={particlesFragmentShader}
          vertexShader={particlesVertexShader}
          uniforms={pointsUniforms}
        />
      </points>
    </>
  );
};

export { FBOParticles };

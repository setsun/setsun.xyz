import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";

interface Props {
  fragmentShader?: string;
  vertexShader?: string;
}

const ShaderPreview: React.FC<Props> = ({ fragmentShader, vertexShader }) => {
  const { size } = useThree();

  const meshRef = useRef<Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      u_resolution: { value: [size.width, size.height] },
      u_time: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    const shaderMaterial = meshRef.current.material as ShaderMaterial;
    shaderMaterial.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default ShaderPreview;

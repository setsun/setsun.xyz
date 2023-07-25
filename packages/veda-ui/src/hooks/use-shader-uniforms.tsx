import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";

interface Args {
  uniforms?: ShaderMaterial["uniforms"];
  onUniformUpdate?: (uniforms: ShaderMaterial["uniforms"]) => void;
}

const useShaderUniforms = ({ uniforms, onUniformUpdate }: Args) => {
  const meshRef = useRef<Mesh>(null!);

  const { size, mouse } = useThree();

  const allUniforms: ShaderMaterial["uniforms"] = useMemo(
    () => ({
      u_resolution: { value: [size.width, size.height] },
      u_mouse: { value: [mouse.x, mouse.y] },
      u_time: { value: 0 },
      ...uniforms,
    }),
    [],
  );

  useFrame(({ clock, mouse, size }) => {
    const shaderMaterial = meshRef.current.material as ShaderMaterial;

    // update uniforms
    shaderMaterial.uniforms.u_time.value = clock.getElapsedTime();
    shaderMaterial.uniforms.u_resolution.value = [size.width, size.height];
    shaderMaterial.uniforms.u_mouse.value = [mouse.x, mouse.y];

    // update uniform callback
    onUniformUpdate?.(shaderMaterial.uniforms);
  });

  return { meshRef, uniforms: allUniforms };
};

export { useShaderUniforms };

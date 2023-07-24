import { useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import { useShaderUniforms } from "@/hooks/use-shader-uniforms";

interface Props {
  fragmentShader?: string;
  vertexShader?: string;
  uniforms?: ShaderMaterial["uniforms"];
  onUniformUpdate?: (uniforms: ShaderMaterial["uniforms"]) => void;
}

const ShaderPreview: React.FC<Props> = ({
  fragmentShader,
  vertexShader,
  uniforms,
  onUniformUpdate,
}) => {
  const { size } = useThree();

  const { meshRef, uniforms: allUniforms } = useShaderUniforms({
    uniforms,
    onUniformUpdate,
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={allUniforms}
      />
    </mesh>
  );
};

export { ShaderPreview };

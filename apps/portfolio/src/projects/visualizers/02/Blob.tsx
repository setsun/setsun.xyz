import { AudioAnalyser, MeshBasicMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useShaderUniforms } from "ui";

import { avg, max } from "@/utils/arrays";
import { modulate } from "@/utils/math";

import blobVertexShader from "./blob.vert";

interface Props {
  radius?: number;
  detail?: number;
  amplitude?: number;
  audioAnalyzer: AudioAnalyser;
}

const Blob = ({
  radius = 1,
  detail = 1,
  amplitude = 10,
  audioAnalyzer,
}: Props) => {
  const { meshRef, uniforms } = useShaderUniforms({
    uniforms: {
      u_amplitude: { value: amplitude },
      u_base_frequency: { value: 0 },
      u_top_frequency: { value: 0 },
    },
    onUniformUpdate(uniforms) {
      const values = Array.from(audioAnalyzer.getFrequencyData());

      const lowerHalfArray = values.slice(0, values.length / 2 - 1);
      const upperHalfArray = values.slice(
        values.length / 2 - 1,
        values.length - 1,
      );
      const lowerMax = max(lowerHalfArray);
      const upperAvg = avg(upperHalfArray);

      const baseFrequency = modulate(
        Math.pow(lowerMax / lowerHalfArray.length, 0.8),
        0,
        1,
        0,
        8,
      );

      const topFrequency = modulate(
        upperAvg / upperHalfArray.length,
        0,
        1,
        0,
        4,
      );

      // update the shader uniforms, based on the audio data
      uniforms.u_base_frequency.value = baseFrequency;
      uniforms.u_top_frequency.value = topFrequency;
    },
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[radius, detail]} />

      <CustomShaderMaterial
        wireframe
        color="#fff"
        baseMaterial={MeshBasicMaterial}
        vertexShader={blobVertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;

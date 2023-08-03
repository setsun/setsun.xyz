import { Color, Vector2 } from "three";
import { useShaderUniforms } from "veda-ui";

import VisualizerCanvas, { Pagination } from "@/components/VisualizerCanvas";

import oceanFragmentShader from "./ocean.frag";
import oceanVertexShader from "./ocean.vert";

const MainScene = ({ controls }: { controls: Record<string, any> }) => {
  const {
    u_amplitude,
    u_speed,
    u_frequency,
    u_high_color,
    u_low_color,
    wireframe,
  } = controls;

  const { meshRef, uniforms } = useShaderUniforms({
    uniforms: {
      u_amplitude: { value: u_amplitude },
      u_speed: { value: u_speed },
      u_frequency: { value: u_frequency },
      u_high_color: { value: new Color(u_high_color) },
      u_low_color: { value: new Color(u_low_color) },
    },
    onUniformUpdate(uniforms) {
      uniforms.u_amplitude.value = u_amplitude;
      uniforms.u_speed.value = u_speed;
      uniforms.u_frequency.value = u_frequency;
      uniforms.u_high_color.value = new Color(u_high_color);
      uniforms.u_low_color.value = new Color(u_low_color);
    },
  });

  return (
    <group rotation={[-Math.PI / 3, 0, -Math.PI / 3]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[8, 8, 128, 128]} />
        <shaderMaterial
          wireframe={wireframe}
          vertexShader={oceanVertexShader}
          fragmentShader={oceanFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
};

const Visualizer: React.FC<{
  pagination: Pagination;
  fallback?: React.ReactNode;
}> = (props) => {
  return (
    <VisualizerCanvas
      headline="VISUALIZER_15"
      audioProps={{
        url: "/audio/Skyline.mp3",
        name: "FKJ - Skyline",
        externalHref: "https://soundcloud.com/fkj-2/fkj-skyline",
      }}
      {...props}
      controls={{
        u_amplitude: 0.25,
        u_speed: 0.25,
        u_frequency: new Vector2(4, 1),
        u_high_color: "#8888ff",
        u_low_color: "#0000ff",
        wireframe: true,
      }}
    >
      {({ controls }) => <MainScene controls={controls} />}
    </VisualizerCanvas>
  );
};

export default Visualizer;

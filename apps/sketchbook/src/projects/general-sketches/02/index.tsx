import { Color } from "three";
import { ShaderPreview } from "ui";

import { ThreeCanvas } from "@/components/ThreeCanvas";

import kaledioscope from "./kaleidoscope.frag";

const MainScene = ({ controls }: { controls: Record<string, any> }) => {
  const { u_scale, u_color_a, u_color_b, u_color_c, u_color_d } = controls;

  return (
    <ShaderPreview
      fragmentShader={kaledioscope}
      uniforms={{
        u_scale: { value: u_scale },
        u_color_a: { value: new Color(u_color_a) },
        u_color_b: { value: new Color(u_color_b) },
        u_color_c: { value: new Color(u_color_c) },
        u_color_d: { value: new Color(u_color_d) },
      }}
      onUniformUpdate={(uniforms) => {
        uniforms.u_scale.value = u_scale;
        uniforms.u_color_a.value = new Color(u_color_a);
        uniforms.u_color_b.value = new Color(u_color_b);
        uniforms.u_color_c.value = new Color(u_color_c);
        uniforms.u_color_d.value = new Color(u_color_d);
      }}
    />
  );
};

const Visualizer = () => {
  return (
    <ThreeCanvas
      audioUrl="https://www.setsun.xyz/audio/dashstar.mp3"
      controls={{
        u_scale: 1.5,
        u_color_a: "#f89bdc",
        u_color_b: "#d4b19b",
        u_color_c: "#a7a794",
        u_color_d: "#ffff72",
      }}
    >
      {({ controls }) => <MainScene controls={controls} />}
    </ThreeCanvas>
  );
};

export default Visualizer;

"use client";

import { Canvas } from "@react-three/fiber";
import { useControls, Leva } from "leva";
import { Color } from "three";
import tunnel from "tunnel-rat";

import { ShaderPreview } from "ui";
import kaledioscope from "@/shaders/kaleidoscope.frag";

const HtmlTunnel = tunnel();

const KaledioscopeShader = () => {
  const [{ u_scale, u_color_a, u_color_b, u_color_c, u_color_d }, set] =
    useControls(() => ({
      u_scale: 1.0,
      u_color_a: "#f89bdc",
      u_color_b: "#d4b19b",
      u_color_c: "#a7a794",
      u_color_d: "#ffff72",
    }));

  return (
    <>
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

      <HtmlTunnel.In>
        <p className="font-antonio absolute right-0 top-0 p-4 text-2xl">
          SHADER_01
        </p>

        <Leva
          titleBar={{
            position: {
              x: 0,
              y: 48,
            },
          }}
        />
      </HtmlTunnel.In>
    </>
  );
};

const Shader: React.FC<{
  pageNumber: number;
}> = ({ pageNumber }) => {
  switch (pageNumber) {
    case 1:
      return <KaledioscopeShader />;
    default:
      return null;
  }
};

const Shaders: React.FC<{ params: { pageNumber: string } }> = (props) => {
  const pageNumber = parseInt(props.params.pageNumber, 10);

  return (
    <>
      <Canvas style={{ height: "100vh" }}>
        <Shader pageNumber={pageNumber} />
      </Canvas>

      <HtmlTunnel.Out />
    </>
  );
};

export default Shaders;

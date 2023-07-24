import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { useControls, Leva } from "leva";
import { Color } from "three";
import tunnel from "tunnel-rat";

import { Button, ShaderPreview } from "veda-ui";
import kaledioscope from "./kaleidoscope.frag";

const HtmlTunnel = tunnel();

const KaledioscopeShader = () => {
  const [showControls, setShowControls] = useState(false);

  const [{ u_scale, u_color_a, u_color_b, u_color_c, u_color_d }] = useControls(
    () => ({
      u_scale: 1.5,
      u_color_a: "#f89bdc",
      u_color_b: "#d4b19b",
      u_color_c: "#a7a794",
      u_color_d: "#ffff72",
    })
  );

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
        <div className="absolute right-0 top-0 p-4 text-right">
          <p className="font-antonio text-2xl">SHADER_01</p>

          <Button
            variant="link"
            size="sm"
            className="p-0 text-xs underline"
            onClick={() => setShowControls(!showControls)}
          >
            {showControls ? "Hide Controls" : "Show Controls"}
          </Button>
        </div>

        <Leva
          hidden={!showControls}
          titleBar={{
            position: {
              x: 0,
              y: 72,
            },
          }}
        />
      </HtmlTunnel.In>
    </>
  );
};

const Visualizer = () => {
  return (
    <>
      <Canvas style={{ height: "100vh" }}>
        <KaledioscopeShader />
      </Canvas>

      <HtmlTunnel.Out />
    </>
  );
};

export default Visualizer;

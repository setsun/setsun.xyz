// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

// color palette
uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform vec3 u_color_c;
uniform vec3 u_color_d;

varying vec2 v_uv;

#pragma glslify: palette = require(../../shaders/color/palette.glsl)

void main() {
  vec3 color = palette(
    length(v_uv),
    u_color_a,
    u_color_b,
    u_color_c,
    u_color_d
  );

  vec3 color = vec3(0.533,0.055,0.831);
  gl_FragColor = vec4(color, 1.0);
}
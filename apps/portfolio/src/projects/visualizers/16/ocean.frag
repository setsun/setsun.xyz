uniform vec2 u_resolution;
uniform float u_time;

uniform vec3 u_low_color;
uniform vec3 u_high_color;

varying float v_elevation;

void main() {
  float mix_strength = v_elevation * 0.25 * 2.;

  vec3 color = mix(u_low_color, u_high_color, mix_strength);

  gl_FragColor = vec4(color, 1.0);
}
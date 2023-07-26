// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

vec3 purple = vec3(0.533,0.055,0.831);

void main() {
  vec3 color = purple;

  gl_FragColor = vec4(color, 1.0);
}
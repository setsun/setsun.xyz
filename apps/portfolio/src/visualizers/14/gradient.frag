// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  gl_FragColor = vec4(uv.x, uv.y, sin(u_time), 1.0);
}
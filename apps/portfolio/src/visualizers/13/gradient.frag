// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

// void main() {
//   vec3 color = u_bg;

//   color = mix(color, u_colorA, noise1);
//   color = mix(color, u_colorB, noise2);

//   gl_FragColor = vec4(color ,1.0);
// }

void main() {
  vec2 uv = v_uv;

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  float noise_1 = snoise2(v_uv + u_time * (0.2));
  float noise_2 = snoise2(v_uv + u_time * (0.2));

  gl_FragColor = vec4(uv.x, uv.y, sin(u_time), 1.0);
}
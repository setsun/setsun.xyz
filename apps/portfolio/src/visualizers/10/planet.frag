#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma glslify: fbm2 = require(../../shaders/noise/fbm2d)

float pattern(in vec2 p, float multiplier) {
  vec2 q = vec2(fbm2(p + vec2(0.0,0.0)),
                fbm2(p + vec2(5.2,1.3)));

  vec2 r = vec2(fbm2(p + multiplier*q + vec2(1.7,9.2)),
                fbm2(p + multiplier*q + vec2(8.3,2.8)));

  vec2 s = vec2(fbm2(p + multiplier*r + vec2(8.3,2.8)),
                fbm2(p + multiplier*r + vec2(5.3,1.8)));

  return fbm2(p + r + s * multiplier);
}

void main() {
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  // scale up the scene by 2
  uv *= 2.;

  float noise = pattern(uv, 4. + sin(u_time * 0.1));

  gl_FragColor = vec4(vec3(noise), 1.);
}
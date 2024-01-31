// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

uniform vec3 u_bg_color;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

varying vec2 v_uv;

#pragma glslify: fbm2 = require(../../../shaders/noise/fbm2d)

float pattern(in vec2 p, float multiplier) {
  vec2 q = vec2(fbm2(p + vec2(0.0,0.0)),
                fbm2(p + vec2(2.2,1.3)));

  vec2 r = vec2(fbm2(p + multiplier*q + vec2(1.7,9.2)),
                fbm2(p + multiplier*q + vec2(1.3,2.8)));

  vec2 s = vec2(fbm2(p + multiplier*r + vec2(8.3,2.8)),
                fbm2(p + multiplier*r + vec2(5.3,1.8)));

  return fbm2(p + r + s * multiplier);
}

void main() {
  vec2 uv = v_uv;

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  // scale up the coordinate system
  uv *= 8.0;

  vec3 color = u_bg_color;

  // adding to the uv in the first arg moves the pattern
  // adding to the second arg changes the shape of the noise
  float noise_1 = pattern(
    uv + (u_time * 0.1),
    5. + cos(u_time * 0.3)
  );

  float noise_2 = pattern(
    uv + (u_time * 0.05),
    1. + sin(u_time * 0.5)
  );

  color = mix(color, u_color_a, noise_1);
  color = mix(color, u_color_b, noise_2);

  gl_FragColor = vec4(color, 1.0);
}
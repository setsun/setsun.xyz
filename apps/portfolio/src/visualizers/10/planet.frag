// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

// color palette
uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform vec3 u_color_c;
uniform vec3 u_color_d;

// data from the vertex shader
varying vec2 vUv;

#pragma glslify: fbm2 = require(../../shaders/noise/fbm2d)
#pragma glslify: palette = require(../../shaders/color/palette)

// noise warping described in https://iquilezles.org/articles/warp/
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
  // assign uv coordinates sent from the vertex shader
  vec2 uv = vUv;

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  // scale up the coordinate plane by 10
  uv *= 10.;

  float noise = pattern(
    uv,
    5. + sin(u_time * 0.3) + sin(u_time * 0.2) + cos(u_time * 0.3)
  );

  vec3 color = palette(
    noise,
    u_color_a,
    u_color_b,
    u_color_c,
    u_color_d
  );

  gl_FragColor = vec4(color, 1.);
}
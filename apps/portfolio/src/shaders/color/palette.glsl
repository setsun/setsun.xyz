// Technique described in https://iquilezles.org/articles/palettes/

#pragma glslify: PI = require(glsl-constants/PI)

vec3 palette(float t, vec3 color_a, vec3 color_b, vec3 color_c, vec3 color_d) {
  return color_a + color_b * cos(PI * 2.0 * (color_c * t + color_d));
}

#pragma glslify: export(palette)

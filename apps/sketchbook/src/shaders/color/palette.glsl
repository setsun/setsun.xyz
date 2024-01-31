// Technique described in https://iquilezles.org/articles/palettes/

vec3 palette(float t, vec3 color_a, vec3 color_b, vec3 color_c, vec3 color_d) {
  return color_a +
  color_b * cos(3.141592653589793 * 2.0 * (color_c * t + color_d));
}

#pragma glslify: export(palette)

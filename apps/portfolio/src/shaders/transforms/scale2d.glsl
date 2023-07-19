mat2 scale2d(vec2 _scale) {
  return mat2(_scale.x, 0.0,
              0.0, _scale.y);
}

#pragma glslify: export(scale2d)

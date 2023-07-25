// attribute vec3 position;
// attribute vec2 uv;

// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

// modifiers for displacement
uniform float u_displacement_offset;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

float amplitude = 1.0;
float base_displacement = 2.0;

void main() {
  float displacement =
    base_displacement + cnoise3(normal + u_displacement_offset) * amplitude;

  vec3 newPosition = position + normal * displacement;
  vec4 modelPosition = modelMatrix * instanceMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  csm_PositionRaw = projectedPosition;
}

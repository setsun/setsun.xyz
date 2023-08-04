// attribute vec3 position;
// attribute vec2 uv;

// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

// intensity of the displacement
uniform float u_amplitude;
uniform float u_base_frequency;
uniform float u_top_frequency;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

void main() {
  float displacement =
    u_base_frequency +
    cnoise3(
      vec3(
        normal.x + u_time * 1.5,
        normal.y + u_time * 2.5,
        normal.z + u_time * 3.5
      )
    ) *
      u_amplitude *
      u_top_frequency;

  vec3 newPosition = position + normal * displacement;
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  csm_PositionRaw = projectedPosition;
}

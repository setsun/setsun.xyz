// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

// attribute vec3 position;
// attribute vec2 uv;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

varying vec2 v_uv;
varying float v_displacement;

void main() {
  v_uv = uv;

  v_displacement = cnoise3(position + vec3(0.1 * u_time));

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

uniform float u_time;
uniform float u_amplitude;
uniform float u_speed;
uniform vec2 u_frequency;

varying float v_elevation;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation =
    sin(modelPosition.x * u_frequency.x + u_time * u_speed) *
    sin(modelPosition.z * u_frequency.y + u_time * u_speed) *
    u_amplitude;

  // add noise iterations
  for (float i = 1.0; i <= 5.0; i++) {
    elevation -= abs(
      cnoise3(vec3(modelPosition.xz * 0.3, u_time * u_speed)) * 0.15
    );
  }

  float v_elevation = elevation;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

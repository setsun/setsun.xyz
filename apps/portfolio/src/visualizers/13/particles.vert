// screen resolution / elapsed time
uniform sampler2D u_positions;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  v_uv = uv;

  vec3 pos = texture2D(u_positions, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 3.0;

  // Size attenuation
  gl_PointSize *= step(1.0 - 1.0 / 64.0, position.x) + 0.5;
}

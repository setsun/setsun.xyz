
uniform sampler2D u_positions;
uniform float u_time;
uniform float u_frequency;
uniform float u_scale;

varying vec2 v_uv;

#pragma glslify: curl3d = require(../../../shaders/noise/curl3d)

void main() {
  vec3 pos = texture2D(u_positions, v_uv).rgb;
  vec3 curl_pos = texture2D(u_positions, v_uv).rgb;

  pos = curl3d(pos * u_frequency + u_time * 0.1);

  curl_pos = curl3d(curl_pos * u_frequency + u_time * 0.1);

  curl_pos += curl3d(curl_pos * u_frequency * 2.0) * 0.5;

  gl_FragColor = vec4(mix(pos, curl_pos, u_scale), 1.0);
}
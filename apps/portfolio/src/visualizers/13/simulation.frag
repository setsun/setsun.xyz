
uniform sampler2D positions;
uniform float u_time;
uniform float u_frequency;

varying vec2 v_uv;

#pragma glslify: curl3d = require(../../shaders/noise/curl3d)

void main() {
  vec3 pos = texture2D(positions, vUv).rgb;
  vec3 curl_pos = texture2D(positions, vUv).rgb;

  pos = curl3d(pos * u_frequency + u_time * 0.1);
  curl_pos = curl3d(curl_pos * u_frequency + u_time * 0.1);
  curl_pos += curl3d(curl_pos * u_frequency * 2.0) * 0.5;

  gl_FragColor = vec4(mix(pos, curl_pos, uTime), 1.0);
}
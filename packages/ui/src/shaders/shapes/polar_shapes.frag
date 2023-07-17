#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
  vec2 normalized = gl_FragCoord.xy / u_resolution.xy;

  vec3 color = vec3(0.);

  // map cartesian coordinates to polar coordinates
  vec2 position = vec2(0.5) - normalized;
  float radius = length(position) * 2.0;
  float angle = atan(position.y, position.x);

  float fill = tan(angle * 4.) * sin(u_time);

  color = vec3(1.-smoothstep(fill, fill+0.02, radius));

  gl_FragColor = vec4(color, 1.0);
}
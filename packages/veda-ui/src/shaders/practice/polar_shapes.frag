uniform vec2 u_resolution;
uniform float u_time;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  vec3 color = vec3(0.);

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  // map cartesian coordinates to polar coordinates
  vec2 position = vec2(0.5) - uv;
  float radius = length(position) * 2.0;
  float angle = atan(position.y, position.x);

  float fill = tan(angle * 4.) * sin(u_time);

  color = vec3(1.-smoothstep(fill, fill+0.02, radius));

  gl_FragColor = vec4(color, 1.0);
}
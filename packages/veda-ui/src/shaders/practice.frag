// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

#pragma glslify: rotate2d = require(./transforms/rotate.glsl)

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  vec3 color = vec3(0.0);

  uv = rotate2d( sin(u_time)*PI ) * uv;

  // step to vec2 (x, y) which can equal either 0 or 1 in each dimension
  // 0 -> black / 1 -> white
  vec2 bottom_left = step(vec2(0.1), uv.xy);
  vec2 top_right = step(vec2(0.1), vec2(1.)-uv.xy);

  // if all are 1, then color is white, else the color is black
  color = vec3(
      bottom_left.x * bottom_left.y * top_right.x * top_right.y
  );

  gl_FragColor = vec4(color,1.0);
}
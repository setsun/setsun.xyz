#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

void main(){
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  uv.x *= u_resolution.x/u_resolution.y;

  vec3 color = vec3(0.);
  float dist = 0.;

  // Remap the space to -1. to 1.
  uv = uv*2.-1.;

  // Number of sides of your shape
  int N = 5;

  // Angle and radius from the current pixel
  float angle = atan(uv.x,uv.y)+PI;
  float radius = TWO_PI/float(N);

  // Shaping function that modulate the distance
  dist = cos(floor(.5+angle/radius)*radius-angle)*length(uv);

  color = vec3(1.-smoothstep(.4,.41,dist));
  // color = vec3(d);

  gl_FragColor = vec4(color,1.);
}

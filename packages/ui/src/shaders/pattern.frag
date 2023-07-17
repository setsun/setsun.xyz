#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


vec3 palette(float t) {
  vec3 a = vec3(0.938, 0.328, 0.718);
  vec3 b = vec3(0.659, 0.438, 0.328);
  vec3 c = vec3(0.388, 0.388, 0.296);
  vec3 d = vec3(2.538, 2.478, 0.168);

  return a + b*cos( 6.28318*(c*t+d) );
}

void main(){
  // normalize the pixel coordinates to [0, 1]
  float aspect_ratio = u_resolution.x / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 finalColor = vec3(0.);

  // center the origin of the coordinate space [-0.5, 0.5]
  uv = uv - 0.5;

  // remap coordinates, so it goes from [-1, 1]
  uv = uv * 2.;

  // correct the aspect ratio
  uv.x *= aspect_ratio;

  vec2 uv0 = uv;

  for (float i = 0.; i < 3.; i++) {
    // divide the scene into multiple repeating sections
    uv *= 2.5;
    uv = fract(uv);
    uv -= 0.5;

    float d = length(uv) * exp(-length(uv0));

    vec3 color = palette(length(uv0) + u_time);

    d = sin(d*8. + u_time) / 8.;
    d = abs(d);
    d = pow(0.01 / d, 1.2);

    finalColor += color * d;
  }

  gl_FragColor = vec4(finalColor, 1.);
}
// screen resolution / elapsed time
uniform vec2 u_resolution;
uniform float u_time;

// color palette
uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform vec3 u_color_c;
uniform vec3 u_color_d;

// other modifiers
uniform float u_scale;

#pragma glslify: palette = require(../../shaders/color/palette.glsl)
#pragma glslify: rotate2d = require(../../shaders/transforms/rotate2d.glsl)
#pragma glslify: scale2d = require(../../shaders/transforms/scale2d.glsl)

void main(){
  // 1. normalize the pixel coordinates by dividing pixel coord by resolution to [0, 1]
  // 2. center the origin of the coordinate space by subtracting 1. [-1.0, 0]
  // 3. remap coordinates by multiplying by the scale factor
  vec2 uv = ((gl_FragCoord.xy / u_resolution.xy) -1.) * u_scale;

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  uv *= rotate2d( u_time*3.14*0.03 );
  uv *= scale2d( vec2(sin(u_time * 0.3)+0.3) );

  // store the original uv coordinates
  vec2 uv0 = uv;

  vec3 finalColor = vec3(0.);

  for (float i = 0.; i < 3.; i++) {
    // divide the scene into multiple repeating sections
    uv *= 2.5;
    uv = fract(uv);
    uv -= 0.5;

    float d = length(uv);
    d *= exp(-length(uv0));

    vec3 color = palette(
      length(uv0) + u_time,
      u_color_a,
      u_color_b,
      u_color_c,
      u_color_d
    );

    d = sin(d*7.5 + u_time) / 7.5;
    d = abs(d);
    d = pow(0.01 / d, 2.);

    finalColor += color * d;
  }

  gl_FragColor = vec4(finalColor, 1.);
}
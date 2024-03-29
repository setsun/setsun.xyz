uniform float u_time;
uniform vec2 u_resolution;

vec2 center_coordinates=vec2(.5,.5);

// function to calculate a circle using the dot product
float circle(in vec2 _st,in float _radius){
  vec2 dist=_st-vec2(.5);

  return 1.-smoothstep(_radius-(_radius*.01), _radius+(_radius*.01), dot(dist,dist)*4.);
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;

  // correct the aspect ratio
  float aspect_ratio = u_resolution.x / u_resolution.y;
  uv.x *= aspect_ratio;

  float percent=0.;

  // a. distance from pixel to the center (0.5)
  // percent = distance(uv, center_coordinates);

  // b. length of vector from pixel to the center (0.5)
  // vec2 to_center = center_coordinates - uv;
  // percent = length(to_center);

  // c. sqrt of vector from pixel to the center (0.5)
  // using hypothenuse equation c = sqrt(a^2 + b^2)
  vec2 to_center=center_coordinates-uv;

  percent=sqrt(
    to_center.x*to_center.x+to_center.y*to_center.y
  );

  // d. trying out combining distance fields
  // percent = distance(uv,vec2(0.4)) + distance(uv,vec2(0.6));
  // percent = distance(uv,vec2(0.4)) * distance(uv,vec2(0.6));
  // percent = min(distance(uv,vec2(0.4)), distance(uv,vec2(0.6)));
  // percent = max(distance(uv,vec2(0.4)), distance(uv,vec2(0.6)));
  // percent = pow(distance(uv,vec2(0.4)), distance(uv,vec2(0.6)));

  float should_color=step(percent,.5);

  vec3 color=vec3(should_color);

  gl_FragColor=vec4(color,1.);
}
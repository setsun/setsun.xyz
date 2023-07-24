uniform float u_time;
uniform vec2 u_resolution;

// with step
void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(0.0);

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

/* With smoothstep
void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(0.0);

    // step to vec2 (x, y) which can equal either 0 or 1 in each dimension
    // 0 -> black / 1 -> white
    vec2 bottom_left = smoothstep(vec2(0.1), vec2(0.15), uv);

    // step to vec2 (x, y) which can equal either 0 or 1 in each dimension
    // 0 -> black / 1 -> white
    vec2 top_right = smoothstep(vec2(0.1), vec2(0.15),  vec2(1.0)-uv);

    // if all are 1, then color is white
    // else the color is black
    color = vec3(
        bottom_left.x * bottom_left.y * top_right.x * top_right.y
    );

    gl_FragColor = vec4(color,1.0);
}
*/

/* With floats
void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(0.0);

    // x = 0.5, y = 0.5
    // x = 0.1, y = 0.1
    // x = 1.0, y = 0.5
    float left = floor(uv.x * 10.0);
    float right = floor(uv.y * 10.0);
    float top = floor((1.0-uv.x) * 10.0);
    float bottom = floor((1.0-uv.y) * 10.0);

    color = vec3(left * right * top * bottom);

    gl_FragColor = vec4(color, 1.0);
}
*/
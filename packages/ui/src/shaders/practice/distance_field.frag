#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // correct the aspect ratio
    float aspect_ratio = u_resolution.x / u_resolution.y;
    uv.x *= aspect_ratio;

    float dist = length(abs(uv) - 0.5);

    gl_FragColor = vec4(vec3(fract(dist*100.)), 1.0);
}
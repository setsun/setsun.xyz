#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 normalized = gl_FragCoord.xy / u_resolution.xy;

    float dist = length(abs(normalized) - 0.5);

    gl_FragColor = vec4(vec3(fract(dist*100.)), 1.0);
}
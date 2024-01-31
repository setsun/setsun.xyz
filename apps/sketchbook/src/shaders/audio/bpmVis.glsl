// Credit: https://gist.github.com/CharStiles/e6fec016967c6c8fd648aa4b6c0055cc
// for visualizing a music beat
float bpmVis(float bpm) {
  // this function can be found graphed out here :https://www.desmos.com/calculator/rx86e6ymw7
  float bps = 60.0 / bpm; // beats per second
  float bpmVis = tan(u_time * 3.1415 / bps);

  // if youre using theForce change the above line to:
  // float bpmVis = tan((time*3.1415)/bps);
  // multiply it by PI so that tan has a regular spike every 1 instead of PI
  // divide by the beat per second so there are that many spikes per second
  bpmVis = clamp(bpmVis, 0.0, 10.0);

  // tan goes to infinity so lets clamp it at 10
  bpmVis = abs(bpmVis) / 20.0;

  // tan goes up and down but we only want it to go up
  // (so it looks like a spike) so we take the absolute value
  // dividing by 20 makes the tan function more spiking than smoothly going
  // up and down, check out the desmos link to see what i mean
  return bpmVis;
}

#pragma glslify: export(bpmVis)

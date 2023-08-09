import * as Plot from "@observablehq/plot";
import { createNoise2D } from "simplex-noise";

import PlotHelper from "@/components/PlotHelper";
import { poisson } from "@/utils/random";

const noise2D = createNoise2D();

function curlNoise(x, y) {
  const eps = 0.0001;

  //Find rate of change in X direction
  let n1 = noise2D(x + eps, y);
  let n2 = noise2D(x - eps, y);

  //Average to find approximate derivative
  const a = (n1 - n2) / (2 * eps);

  //Find rate of change in Y direction
  n1 = noise2D(x, y + eps);
  n2 = noise2D(x, y - eps);

  //Average to find approximate derivative
  const b = (n1 - n2) / (2 * eps);

  //Curl
  return [b, -a];
}

const DataExploration = () => {
  return (
    <PlotHelper
      options={{
        inset: 6,
        width: 1024,
        height: 1024,
        aspectRatio: 1,
        axis: null,
        marks: [
          Plot.vector(poisson([0, 0, 2, 2], { n: 4000 }), {
            length: ([x, y]) => (noise2D(x + 2, y) + 0.5) * 24,
            rotate: ([x, y]) => noise2D(x, y) * 360,
            stroke: "white",
          }),
        ],
      }}
    />
  );
};

export default DataExploration;

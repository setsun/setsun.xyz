// Contour explorations: https://observablehq.com/plot/marks/contour

import * as Plot from "@observablehq/plot";

import PlotHelper from "@/components/PlotHelper";

import volcanoJSON from "./volcano.json";

const DataExploration = () => {
  return (
    <PlotHelper
      options={{
        style: { background: "transparent" },
        color: {
          // legend: true,
          label: "Elevation (m)",
        },
        marks: [
          Plot.contour(volcanoJSON.values, {
            width: volcanoJSON.width,
            height: volcanoJSON.height,
            fill: Plot.identity,
            stroke: "black",
          }),
        ],
      }}
    />
  );
};

export default DataExploration;

import * as Plot from "@observablehq/plot";

import PlotHelper from "@/components/PlotHelper";

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

const DataExploration = () => {
  return (
    <PlotHelper
      options={{
        marks: [
          Plot.tree(gods, {textStroke: "black"})
        ]
      }}
    />
  );
};

export default DataExploration;

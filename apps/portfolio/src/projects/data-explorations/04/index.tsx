// Delaunay explorations: https://observablehq.com/plot/marks/delaunay

import * as Plot from "@observablehq/plot";
import { csv } from "d3-fetch";
import SquareLoader from "react-spinners/SquareLoader";
import useSWR from "swr";

import PlotHelper from "@/components/PlotHelper";

const DataExploration = () => {
  const { data, error, isLoading } = useSWR("/data/penguins.csv", (url) =>
    csv(url).then((data) => data),
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SquareLoader loading color="white" />
      </div>
    );
  }

  return (
    <PlotHelper
      options={{
        style: { background: "transparent" },
        width: 1024,
        height: 1024,
        x: { type: "point" },
        y: { type: "point" },
        color: { legend: true },
        marks: [
          Plot.delaunayLink(data, {
            x: "culmen_depth_mm",
            y: "culmen_length_mm",
            stroke: "body_mass_g",
            strokeWidth: 1.5,
          }),
          Plot.voronoiMesh(data, {
            x: "culmen_depth_mm",
            y: "culmen_length_mm",
          }),
          Plot.hull(data, {
            x: "culmen_depth_mm",
            y: "culmen_length_mm",
            fill: "species",
            fillOpacity: 0.2,
          }),
          Plot.dot(data, {
            x: "culmen_depth_mm",
            y: "culmen_length_mm",
            fill: "species",
          }),
        ],
      }}
    />
  );
};

export default DataExploration;

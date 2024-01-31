// Line explorations: https://observablehq.com/plot/marks/line

import * as Plot from "@observablehq/plot";
import SquareLoader from "react-spinners/SquareLoader";
import useSWR from "swr";

import PlotHelper from "@/components/PlotHelper";

// quick and dirty data transformation to get it into a tidy spot
function transformNYCPopulationData(data) {
  const years = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040];
  const transformed = [];

  for (const datum of data) {
    for (const year of years) {
      transformed.push({
        borough: datum.borough.trim(),
        // i hate meta-programming, but the data be what it be 🤷‍♂️
        population: parseInt(datum[`_${year}`], 10),
        percentage: parseFloat(datum[`_${year}_boro_share_of_nyc_total`]),
        year,
      });
    }
  }

  return transformed;
}

const DataExploration = () => {
  const { data, error, isLoading } = useSWR(
    "https://data.cityofnewyork.us/resource/xywu-7bv9.json",
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then(transformNYCPopulationData)
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SquareLoader loading color="white" />
      </div>
    );
  }

  return (
    <>
      <PlotHelper
        options={{
          style: { background: "transparent" },
          color: { legend: true },
          marks: [
            Plot.frame(),
            Plot.lineY(data, { x: "year", y: "percentage" }),
            Plot.text(data, {
              x: "year",
              y: "percentage",
              lineAnchor: "bottom",
            }),
          ],
        }}
      />
    </>
  );
};

export default DataExploration;

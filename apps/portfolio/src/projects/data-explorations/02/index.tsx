import * as Plot from "@observablehq/plot";
import useSWR from "swr";
import * as topojson from "topojson-client";

import PlotHelper from "@/components/PlotHelper";
import countiesJSON from "@/json/counties.json";
import usJSON from "@/json/us.json";

const fetcher = (url) => fetch(url).then((res) => res.json());

// link: https://observablehq.com/@observablehq/build-your-first-choropleth-map-with-observable-plot
const counties = topojson.feature(usJSON, usJSON.objects.counties);

const DataExploration = () => {
  return (
    <>
      <PlotHelper
        options={{
          style: { background: "transparent" },
          color: { legend: true },
          projection: "albers-usa", // Set the projection
          marks: [
            Plot.geo(counties, {stroke: "white"}) // Add county boundaries using the geo mark
          ],
        }}
      />
    </>
  );
};

export default DataExploration;

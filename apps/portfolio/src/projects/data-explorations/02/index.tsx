/**
 * Projection & Geo explorations:
 * - https://observablehq.com/plot/features/projections
 * - https://observablehq.com/plot/marks/geo
 */

import * as Plot from "@observablehq/plot";
import { ProjectionName } from "@observablehq/plot";
import useSWR from "swr";
import * as topojson from "topojson-client";

import PlotHelper from "@/components/PlotHelper";
import usJSON from "@/json/us.json";
import worldJSON from "@/json/world.json";

const fetcher = (url) => fetch(url).then((res) => res.json());

// link: https://observablehq.com/@observablehq/build-your-first-choropleth-map-with-observable-plot
const counties = topojson.feature(usJSON, usJSON.objects.counties);
const nation = topojson.feature(usJSON, usJSON.objects.nation);
const statemesh = topojson.mesh(usJSON, usJSON.objects.states);
const land = topojson.feature(worldJSON, worldJSON.objects.land);

enum ProjectionNames {
  AlbersUSA = "albers-usa",
  Albers = "albers",
  AzimuthalEqualArea = "azimuthal-equal-area",
  AzimuthalEquidistant = "azimuthal-equidistant",
  ConicConformal = "conic-conformal",
  ConicEqualArea = "conic-equal-area",
  ConicEquidistant = "conic-equidistant",
  EqualEarth = "equal-earth",
  Equirectangular = "equirectangular",
  Gnomonic = "gnomonic",
  Idenity = "identity",
  ReflectY = "reflect-y",
  Mercator = "mercator",
  Orthographic = "orthographic",
  Stereographic = "stereographic",
  TransverseMercator = "transverse-mercator",
}

const DataExploration = () => {
  return (
    <>
      <PlotHelper
        options={{
          style: { background: "transparent" },
          color: { legend: true },
          projection: ProjectionNames.TransverseMercator, // Set the projection
          marks: [
            Plot.graticule(),
            Plot.geo(land, { fill: "currentColor" }),
            Plot.sphere(),
          ],
        }}
      />

      <PlotHelper
        options={{
          style: { background: "transparent" },
          color: { legend: true },
          projection: "albers-usa", // Set the projection
          marks: [
            Plot.geo(nation),
            Plot.geo(statemesh, { strokeOpacity: 0.2 }),
          ],
        }}
      />

      <PlotHelper
        options={{
          style: { background: "transparent" },
          color: { legend: true },
          projection: "albers-usa", // Set the projection
          marks: [
            Plot.geo(counties, { stroke: "white" }), // Add county boundaries using the geo mark
          ],
        }}
      />
    </>
  );
};

export default DataExploration;

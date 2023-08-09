import * as Plot from "@observablehq/plot";
import useSWR from "swr";

import PlotHelper from "@/components/PlotHelper";

const fetcher = (url) => fetch(url).then((res) => res.json());

const DataExploration = () => {
  return (
    <>
      <PlotHelper
        options={{
          style: { background: "transparent" },
          color: { legend: true },
          projection: { type: "orthographic", rotate: [0, -30, 20] },
          marks: [
            Plot.sphere({ fill: "black", stroke: "currentColor" }),
            Plot.graticule({ strokeOpacity: 0.3 }),
          ],
        }}
      />

      {/* <PlotHelper
        options={{
          projection: 'albers-usa',
          marks: [

          ]
        }}
      /> */}
    </>
  );
};

export default DataExploration;

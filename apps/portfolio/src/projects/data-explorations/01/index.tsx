import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

const DataExploration = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const appleStockData = [
      {
        Date: new Date("2013-05-13"),
        Open: 64.501427,
        High: 65.414284,
        Low: 64.5,
        Close: 64.96286,
        Volume: 79237200,
      },
      {
        Date: new Date("2013-05-14"),
        Open: 64.835716,
        High: 65.028572,
        Low: 63.164288,
        Close: 63.408573,
        Volume: 111779500,
      },
      {
        Date: new Date("2013-05-15"),
        Open: 62.737144,
        High: 63.0,
        Low: 60.337143,
        Close: 61.264286,
        Volume: 185403400,
      },
      {
        Date: new Date("2013-05-16"),
        Open: 60.462856,
        High: 62.549999,
        Low: 59.842857,
        Close: 62.082859,
        Volume: 150801000,
      },
      {
        Date: new Date("2013-05-17"),
        Open: 62.721428,
        High: 62.869999,
        Low: 61.572857,
        Close: 61.894287,
        Volume: 106976100,
      },
    ];

    const plot = Plot.plot({
      style: { background: "transparent" },
      caption: "Figure 1. Apple Stock Performance.",
      color: { legend: true },
      marks: [
        Plot.frame(),
        Plot.lineY(appleStockData, { x: "Date", y: "Close", stroke: "blue" }),
      ],
    });

    containerRef.current.append(plot);

    return () => plot.remove();
  }, []);

  return <div className="bg-transparent" ref={containerRef} />;
};

export default DataExploration;

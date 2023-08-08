import * as ObservablePlot from "@observablehq/plot";
import { useEffect, useRef } from "react";

interface Props {
  options: ObservablePlot.PlotOptions;
}

const Plot = ({ options }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const plot = ObservablePlot.plot({
      ...options,
      style: { background: "transparent" },
    });

    containerRef.current.append(plot);

    return () => plot.remove();
  }, [options]);

  return <div className="bg-transparent" ref={containerRef} />;
};

export default Plot;

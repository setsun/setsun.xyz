import * as Plot from "@observablehq/plot";

import PlotHelper from "@/components/PlotHelper";

const traffic = [
  {
    location: "Von der Heydt",
    date: "2016-01-04T01:00:00.000Z",
    vehicles: 89,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T02:00:00.000Z",
    vehicles: 56,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T00:00:00.000Z",
    vehicles: 163,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T03:00:00.000Z",
    vehicles: 47,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T04:00:00.000Z",
    vehicles: 63,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T05:00:00.000Z",
    vehicles: 228,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T06:00:00.000Z",
    vehicles: 677,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T07:00:00.000Z",
    vehicles: 1442,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T08:00:00.000Z",
    vehicles: 1700,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T09:00:00.000Z",
    vehicles: 1177,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T10:00:00.000Z",
    vehicles: 1003,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T11:00:00.000Z",
    vehicles: 966,
  },
  {
    location: "Von der Heydt",
    date: "2016-01-04T12:00:00.000Z",
    vehicles: 1030,
  },
  {
    location: "Saarbrücken-Neuhaus",
    date: "2016-01-04T11:00:00.000Z",
    vehicles: 477,
  },
  {
    location: "Saarbrücken-Neuhaus",
    date: "2016-01-04T23:00:00.000Z",
    vehicles: 111,
  },
  {
    location: "Saarbrücken-Neuhaus",
    date: "2016-01-05T00:00:00.000Z",
    vehicles: 77,
  },
  {
    location: "Saarbrücken-Neuhaus",
    date: "2016-01-05T01:00:00.000Z",
    vehicles: 35,
  },
  {
    location: "Saarbrücken-Neuhaus",
    date: "2016-01-05T02:00:00.000Z",
    vehicles: 44,
  },
  {
    location: "Saarbrücken-Neuhaus",
    date: "2016-01-05T03:00:00.000Z",
    vehicles: 40,
  },
  {
    location: "Neustadt i. H.-Süd",
    date: "2016-01-09T22:00:00.000Z",
    vehicles: 312,
  },
  {
    location: "Neustadt i. H.-Süd",
    date: "2016-01-09T21:00:00.000Z",
    vehicles: 412,
  },
  {
    location: "Neustadt i. H.-Süd",
    date: "2016-01-09T23:00:00.000Z",
    vehicles: 270,
  },
  {
    location: "Neustadt i. H.-Süd",
    date: "2016-01-08T22:00:00.000Z",
    vehicles: 346,
  },
  {
    location: "Neustadt i. H.-Süd",
    date: "2016-01-09T19:00:00.000Z",
    vehicles: 828,
  },
];

const DataExploration = () => {
  return (
    <PlotHelper
      options={{
        marginLeft: 120,
        padding: 0,
        y: { label: null },
        color: { legend: true, zero: true },
        marks: [
          Plot.cell(
            traffic,
            Plot.group(
              { fill: "median" },
              {
                x: (d) => d.date,
                y: "location",
                fill: "vehicles",
                inset: 0.5,
                sort: { y: "fill" },
              },
            ),
          ),
        ],
      }}
    />
  );
};

export default DataExploration;

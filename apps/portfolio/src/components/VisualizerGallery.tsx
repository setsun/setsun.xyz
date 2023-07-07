"use client";

import { PlayIcon, PauseIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";
import RingLoader from "react-spinners/RingLoader";
import dynamic from "next/dynamic";

const VisualizerOne = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerOne),
  { ssr: false }
);
const VisualizerTwo = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerTwo),
  { ssr: false }
);
const VisualizerThree = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerThree),
  { ssr: false }
);
const VisualizerFour = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerFour),
  { ssr: false }
);
const VisualizerFive = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerFive),
  { ssr: false }
);
const VisualizerSix = dynamic(
  () => import("visualizers").then((mod) => mod.VisualizerSix),
  { ssr: false }
);

const VisualizerGallery: React.FC = () => {
  return (
    <Suspense fallback={<RingLoader loading color="white" size={48} />}>
      <VisualizerTwo />

      <div className="absolute left-0 top-0 mr-1 hidden h-full w-full p-4 text-xs">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
          href="https://soundcloud.com/thisneverhappenedlabel/virtual-self-ghost-voices-lane-8-remix"
        >
          <b>Virtual Self - Ghost Voices (Lane 8 Remix) ↗</b>
        </a>
        <p className="m-0">⸻</p>

        <button className="flex items-center">
          Play <PlayIcon className="ml-1 inline" />
        </button>

        <p className="font-antonio absolute right-0 top-0 flex justify-between self-end text-3xl">
          VISUALIZER _01
        </p>
      </div>
    </Suspense>
  );
};

export default VisualizerGallery;

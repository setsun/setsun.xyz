"use client";

import { PlayIcon, PauseIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

import dynamic from 'next/dynamic';

const VisualizerThree = dynamic(() => import('visualizers').then((mod) => mod.VisualizerThree), { ssr: false });

interface Props {}

const VisualizerGallery: React.FC<Props> = (props) => {
  return (
    <div>
      <VisualizerThree />

      <div className="absolute left-0 top-0 mr-1 hidden h-full w-full text-xs">
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

        <p className="font-antonio absolute right-0 top-0 text-3xl">
          VISUALIZER _01
        </p>
      </div>
    </div>
  );
};

export default VisualizerGallery;

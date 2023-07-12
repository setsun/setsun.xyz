"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const VisualizerItem: React.FC<{
  title: string;
  imageSrc: string;
  pageNumber: number;
}> = ({ title, imageSrc, pageNumber }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      className="font-antonio relative block h-1/5 w-full overflow-hidden border-b-2 p-4 text-2xl"
      href={`/visualizers/${pageNumber}`}
    >
      <p className="relative z-10">{title}</p>

      <Image
        src={imageSrc}
        alt={`Image preview for visualizer ${pageNumber}`}
        fill={true}
        className="transition-opacity duration-500 ease-in-out"
        style={{
          objectFit: "cover",
          opacity: imageLoaded ? 0.3 : 0,
        }}
        onLoad={() => setImageLoaded(true)}
      />
    </Link>
  );
};

const linkData = [
  {
    title: "_01",
    imageSrc: "/images/visualizer-previews/1.png",
  },
  {
    title: "_02",
    imageSrc: "/images/visualizer-previews/2.png",
  },
  {
    title: "_03",
    imageSrc: "/images/visualizer-previews/3.png",
  },
  {
    title: "_04",
    imageSrc: "/images/visualizer-previews/4.png",
  },
  {
    title: "_05",
    imageSrc: "/images/visualizer-previews/5.png",
  },
  {
    title: "_06",
    imageSrc: "/images/visualizer-previews/6.png",
  },
  {
    title: "_07",
    imageSrc: "/images/visualizer-previews/7.png",
  },
  // {
  //   title: "_08",
  //   imageSrc: "/images/visualizer-previews/8.png"
  // },
] as const;

const Visualizer: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b-2 p-4">
        <p className="font-antonio text-2xl">3D Visualizers</p>
      </div>

      {linkData.map(({ title, imageSrc }, index) => (
        <VisualizerItem
          key={index}
          pageNumber={index + 1}
          title={title}
          imageSrc={imageSrc}
        />
      ))}
    </div>
  );
};

export default Visualizer;

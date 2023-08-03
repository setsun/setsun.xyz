"use client";

import PagePreviewLink from "@/components/PagePreviewLink";

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
  {
    title: "_08",
    imageSrc: "/images/visualizer-previews/8.png",
  },
  {
    title: "_09",
    imageSrc: "/images/visualizer-previews/9.png",
  },
  {
    title: "_10",
    imageSrc: "/images/visualizer-previews/10.png",
  },
  {
    title: "_11",
    imageSrc: "/images/visualizer-previews/11.png",
  },
  {
    title: "_12",
    imageSrc: "/images/visualizer-previews/12.png",
  },
  {
    title: "_13",
    imageSrc: "/images/visualizer-previews/13.png",
  },
  // {
  //   title: "_14",
  //   imageSrc: "/images/visualizer-previews/14.png",
  // },
  // {
  //   title: "_15",
  //   imageSrc: "/images/visualizer-previews/15.png",
  // },
] as const;

const Visualizers: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b border-r p-4">
        <h2 className="font-antonio mb-2 text-2xl">Visualizers</h2>
        <p className="font-inter text-xs font-thin">
          A collection of 3D & 2D visual experiments
        </p>
      </div>

      {linkData.map(({ title, imageSrc }, index) => (
        <PagePreviewLink
          key={index}
          href={`/visualizers/${index + 1}`}
          title={title}
          imageSrc={imageSrc}
        />
      ))}
    </div>
  );
};

export default Visualizers;

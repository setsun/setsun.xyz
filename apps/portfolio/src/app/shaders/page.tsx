"use client";

import PagePreviewLink from "@/components/PagePreviewLink";

const linkData = [
  {
    title: "_01",
  },
] as const;

const Shaders: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b-2 p-4">
        <p className="font-antonio text-2xl">Shaders</p>
      </div>

      {linkData.map(({ title }, index) => (
        <PagePreviewLink
          href={`/shaders/${index + 1}`}
          key={index}
          title={title}
        />
      ))}
    </div>
  );
};

export default Shaders;

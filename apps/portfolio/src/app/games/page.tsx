"use client";

import PagePreviewLink from "@/components/PagePreviewLink";

const linkData = [
  {
    title: "_01",
  },
] as const;

const Games: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b border-r p-4">
        <h2 className="font-antonio mb-2 text-2xl">Games</h2>
        <p className="font-inter text-xs font-thin">
          A collection of games made for the web
        </p>
      </div>

      {linkData.map(({ title }, index) => (
        <PagePreviewLink
          key={index}
          href={`/games/${index + 1}`}
          title={title}
        />
      ))}
    </div>
  );
};

export default Games;

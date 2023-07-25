"use client";

import PagePreviewLink from "@/components/PagePreviewLink";

const linkData = [
  {
    title: "_01",
  },
] as const;

const DataExplorations: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b-2 border-r-2 p-4">
        <h2 className="font-antonio mb-2 text-2xl">Data Explorations</h2>
        <p className="font-inter text-xs font-thin">
          Deriving meaning and visual insights from data
        </p>
      </div>

      {linkData.map(({ title }, index) => (
        <PagePreviewLink
          key={index}
          href={`/data-explorations/${index + 1}`}
          title={title}
        />
      ))}
    </div>
  );
};

export default DataExplorations;

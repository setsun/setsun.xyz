"use client";

import PagePreviewLink from "@/components/PagePreviewLink";

const linkData = [
  {
    title: "_01",
  },
] as const;

const UserInterfaces: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b border-r p-4">
        <h2 className="font-antonio mb-2 text-2xl">User Interfaces (UI)</h2>
        <p className="font-inter text-xs font-thin">
          A collection of visual and interactive UI experiments
        </p>
      </div>

      {linkData.map(({ title }, index) => (
        <PagePreviewLink
          key={index}
          href={`/user-interfaces/${index + 1}`}
          title={title}
        />
      ))}
    </div>
  );
};

export default UserInterfaces;

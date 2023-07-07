import Link from "next/link";

const VisualizerItem: React.FC<{ title: string; pageNumber: number }> = ({
  title,
  pageNumber,
}) => {
  return (
    <Link
      className="font-antonio block h-1/5 w-full border-b-2 p-4 text-2xl"
      href={`/visualizers/${pageNumber}`}
    >
      <p>{title}</p>
    </Link>
  );
};

const linkData = [
  {
    title: "_01",
  },
  {
    title: "_02",
  },
  {
    title: "_03",
  },
  {
    title: "_04",
  },
  {
    title: "_05",
  },
  {
    title: "_06",
  },
] as const;

const Visualizer: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto text-2xl">
      {linkData.map((data, index) => (
        <VisualizerItem key={index} pageNumber={index + 1} title={data.title} />
      ))}
    </div>
  );
};

export default Visualizer;

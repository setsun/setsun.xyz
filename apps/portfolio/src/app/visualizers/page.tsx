import dynamic from "next/dynamic";

interface Props {}

// const VisualizerOne = dynamic(
//   // @ts-ignore
//   () => import('visualizers/VisualizerOne'),
//   { ssr: false },
// );

const Visualizers: React.FC<Props> = (props) => {
  return (
    <div className="flex h-screen items-center justify-center text-3xl">
      {/* <VisualizerOne /> */}
    </div>
  );
};

export default Visualizers;

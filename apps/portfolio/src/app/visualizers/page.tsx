import dynamic from 'next/dynamic';

interface Props { }

// const VisualizerOne = dynamic(
//   // @ts-ignore
//   () => import('visualizers/VisualizerOne'),
//   { ssr: false },
// );

const Visualizers: React.FC<Props> = (props) => {
  return (
    <div className="h-screen text-3xl flex justify-center items-center">
      {/* <VisualizerOne /> */}
    </div>
  );
}

export default Visualizers;

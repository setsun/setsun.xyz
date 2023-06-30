import { useTrail, animated, config } from '@react-spring/web';
import React from "react"
import { GetStaticProps } from "next"
import { Canvas } from "@react-three/fiber";
import WireframePlanet from "../components/hero-scenes/WireframePlanet";

// const Visual = dynamic(
//   () => {
//     // @ts-ignore
//     const mod = import('visualizers/VisualizerOne');
//     return mod;
//   },
//   { ssr: false },
// );

const ANIMATED_TEXT = [
  "I'll miss the sea, but a person needs new experiences.",
  "They jar something deep inside, allowing him to grow",
  "Without change something sleeps inside us, and seldom awakens.",
  "The sleeper must awaken."
];

export const getStaticProps: GetStaticProps = async () => {
  // todo: determine what data to fetch in home page

  return {
    props: {},
    revalidate: 10
  }
}

interface Props { }

const Index: React.FC<Props> = (props) => {
  const trails = useTrail(ANIMATED_TEXT.length, {
    delay: 500,
    config: { mass: 5, tension: 200, friction: 300 },
    from: { opacity: 0, transform: 'translate3d(0, -48px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
  });

  return (
    <div className='relative'>
      <div className='absolute top-0 ml-2 mt-2'>
        {trails.map((props, i) => (
          <animated.div className="text-3xl font-extralight mb-3" style={props} key={i}>{ANIMATED_TEXT[i]}</animated.div>
        ))}
      </div>

      <Canvas
        className="w-full aspect-video"
        camera={{
          position: [0, 0, -30]
        }}
      >
        <WireframePlanet />
      </Canvas>
    </div>
  )
}

export default Index;

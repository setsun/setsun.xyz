import { useTrail, animated } from '@react-spring/web';
import { Canvas } from "@react-three/fiber";
import React from "react"
import { GetStaticProps } from "next"
import WireframePlanet from "../components/hero-scenes/WireframePlanet";

const ANIMATED_TEXT = [
  "I am Setsun",
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
  );
}

export default Index;

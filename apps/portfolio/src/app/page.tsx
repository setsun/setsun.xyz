'use client'

import { useTrail, animated } from '@react-spring/web';
import { Canvas } from "@react-three/fiber";
import { Metadata } from "next";
import { Button } from "ui";
import WireframePlanet from "../components/hero-scenes/WireframePlanet";

// export const metadata: Metadata = {
//   title: "Docs - Turborepo Example",
// };

const ANIMATED_TEXT = [
  "I am Setsun",
];

export default function Home() {
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

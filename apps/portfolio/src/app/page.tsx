"use client";

import { useTrail, animated } from "@react-spring/web";
import { Canvas } from "@react-three/fiber";
import { Metadata } from "next";
import WireframePlanet from "../components/hero-scenes/WireframePlanet";

// export const metadata: Metadata = {
//   title: "Docs - Turborepo Example",
// };

const ANIMATED_TEXT = ["I am Setsun"];

export default function Home() {
  const trails = useTrail(ANIMATED_TEXT.length, {
    delay: 500,
    config: { mass: 5, tension: 200, friction: 300 },
    from: { opacity: 0, transform: "translate3d(0, -48px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
  });

  return (
    <div className="relative">
      <div className="absolute top-0 ml-2 mt-2">
        {trails.map((props, i) => (
          <animated.div
            className="mb-3 text-3xl font-extralight"
            style={props}
            key={i}
          >
            {ANIMATED_TEXT[i]}
          </animated.div>
        ))}
      </div>

      <Canvas
        className="aspect-video w-full"
        camera={{
          position: [0, 0, -30],
        }}
      >
        <WireframePlanet />
      </Canvas>
    </div>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { Metadata } from "next";
import WireframePlanet from "../components/hero-scenes/WireframePlanet";

// export const metadata: Metadata = {
//   title: "Docs - Turborepo Example",
// };

export default function Home() {
  return (
    <div className="relative h-screen">
      <Canvas
        className="w-full"
        camera={{
          position: [0, 0, -30],
        }}
      >
        <WireframePlanet />
      </Canvas>
    </div>
  );
}

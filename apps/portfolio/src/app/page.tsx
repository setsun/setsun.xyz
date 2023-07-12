"use client";

import { Canvas } from "@react-three/fiber";

import WireframePlanet from "@/components/hero-scenes/WireframePlanet";

export default function Home() {
  return (
    <div
      className="relative h-screen animate-fade-in opacity-0"
      style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
    >
      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center">
        <h2
          className="font-antonio animate-pulse opacity-80"
          style={{ animationDuration: "12s" }}
        >
          〰 a perpetual work in progress 〰
        </h2>
      </div>

      <Canvas
        className="w-full"
        resize={{ debounce: 0 }}
        camera={{
          position: [0, 0, -30],
        }}
      >
        <WireframePlanet />
      </Canvas>
    </div>
  );
}

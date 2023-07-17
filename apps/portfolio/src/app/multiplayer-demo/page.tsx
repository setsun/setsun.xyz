"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useContext } from "react";

import {
  MultiplayerContextProvider,
  MultiplayerContext,
} from "@/context/MultiplayerContext";

const MainScene = () => {
  const { state, onBroadcastLocalPlayerState, getPlayerStates } =
    useContext(MultiplayerContext);

  useFrame(({ camera }) => {
    // update the current users position to broadcast to other users
    onBroadcastLocalPlayerState({
      position: [camera.position.x, camera.position.y, camera.position.z],
    });

    const playerStates = getPlayerStates();

    // update all positions of all players
    for (const { id, meshRef } of state.players) {
      const playerState = playerStates.get(id);
      const playerPosition = playerState.user.position;
      const playerMesh = meshRef?.current;

      playerMesh?.position?.set?.(
        // @ts-ignore
        ...playerPosition
      );
    }
  });

  return (
    <>
      {state.players.map(({ id, meshRef }) => (
        <mesh key={id} ref={meshRef}>
          <dodecahedronGeometry args={[5, 5]} />
          <meshNormalMaterial wireframe />
        </mesh>
      ))}
    </>
  );
};

export default function Home() {
  return (
    <MultiplayerContextProvider
      roomName="multiplayer-demo-room"
      signalingServerUrl="ws://localhost:4444"
    >
      <div className="relative h-screen text-black">
        <Canvas
          className="w-full"
          camera={{ fov: 45 }}
          resize={{ debounce: 0 }}
        >
          <MainScene />

          <OrbitControls />
        </Canvas>
      </div>
    </MultiplayerContextProvider>
  );
}

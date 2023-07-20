"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useContext } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import {
  MultiplayerContextProvider,
  MultiplayerContext,
} from "@/context/MultiplayerContext";

// the shared document / network providers are singletons to be initialized only once
const yDoc = new Y.Doc();
const yNetworkProvider = new WebrtcProvider("multiplayer-demo-room", yDoc, {
  signaling: ["wss://y-webrtc-signaling-eu.herokuapp.com"],
});

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
      const playerPosition = playerState?.user?.position;
      const playerMesh = meshRef?.current;

      if (!playerPosition || !playerMesh) continue;

      playerMesh?.position?.set?.(
        playerPosition[0],
        playerPosition[1],
        playerPosition[2]
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
    <MultiplayerContextProvider yDoc={yDoc} yNetworkProvider={yNetworkProvider}>
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

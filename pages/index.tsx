import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
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

export const getStaticProps: GetStaticProps = async () => {
  // todo: determine what data to fetch in home page

  return {
    props: {},
    revalidate: 10
  }
}

interface Props {}

const Index: React.FC<Props> = (props) => {
  return (
    <Canvas
      className="w-full aspect-video"
      camera={{
        position: [0, 0, -30]
      }}
    >
      <WireframePlanet />
    </Canvas>
  )
}

export default Index;

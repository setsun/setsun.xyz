import React from "react"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic";
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma";
import SpotifyIframePlaylist from "../components/SpotifyIframePlaylist";
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
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <main>
        <Canvas
          className="w-full aspect-video"
          camera={{
            position: [0, 0, -30]
          }}
        >
          <WireframePlanet />
        </Canvas>

        <div className="mt-6">
          <h2 className="underline mb-2">Recent Posts</h2>
          {props.feed.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>

        {/* <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1bUUPhe0zP9FgrsqYjxbTp?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1cUbQxIOFcxeL5oUheu85i?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/3xx5COLUZ7Xwvyfg8MF4Nb?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/4LddzZkIk08J3IwqXladlJ?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1aQK4Hz4Xmz3Y4NEhz9ReT?theme=0" />
        <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/26ItkYptyl56YEIYQDQs7r?theme=0" /> */}
      </main>
    </Layout>
  )
}

export default Blog

import React from "react"
import { GetStaticProps } from "next"
import * as Collapsible from "@radix-ui/react-collapsible";
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma";
import SpotifyIframePlaylist from "../components/SpotifyIframePlaylist";

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
        <div className="mb-6">
          <p>Engineering @ <a href="https://digitalocean.com">DigitalOcean</a>.</p>
          <p>Previously worked on engineering teams @ <a href="https://aws.amazon.com">Amazon Web Services (AWS)</a>, <a href="https://kickstarter.com">Kickstarter</a>, <a href="https://frame.io">Frame.io</a>, <a href="https://tech.walmart.com">Walmart Global Tech</a>, <a href="https://hubspot.com">HubSpot</a>, and <a href="https://wayfair.com">Wayfair</a></p>
        </div>

        {props.feed.map((post, i) => (
          <Post key={i} post={post} />
        ))}

        {/** todo: implement logic for open / close */}
        <Collapsible.Root open>
          <Collapsible.Trigger className="my-2">
          </Collapsible.Trigger>

          <Collapsible.Content className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-2">
            <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1bUUPhe0zP9FgrsqYjxbTp?theme=0" />
            <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1cUbQxIOFcxeL5oUheu85i?theme=0" />
            <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/3xx5COLUZ7Xwvyfg8MF4Nb?theme=0" />
            <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/4LddzZkIk08J3IwqXladlJ?theme=0" />
            <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/1aQK4Hz4Xmz3Y4NEhz9ReT?theme=0" />
            <SpotifyIframePlaylist src="https://open.spotify.com/embed/playlist/26ItkYptyl56YEIYQDQs7r?theme=0" />
          </Collapsible.Content>
        </Collapsible.Root>
      </main>
    </Layout>
  )
}

export default Blog

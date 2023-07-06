import React from "react"
import Post, { PostProps } from "../../components/Post"
import prisma from "../../lib/prisma";


async function getFeed() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return feed;
}

export default async function Blog() {
  const feed = await getFeed();

  return (
    <div>
      <h2 className="underline mb-2">Recent Posts</h2>
      {feed.map((post, i) => (
        // @ts-ignore
        <Post key={i} post={post} />
      ))}
    </div>
  )
}

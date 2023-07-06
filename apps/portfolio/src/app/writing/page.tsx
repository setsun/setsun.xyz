import { client } from "database";
import React from "react";
import Post, { PostProps } from "../../components/Post";

async function getFeed() {
  const feed = await client.post.findMany({
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
      <h2 className="mb-2 underline">Recent Posts</h2>
      {feed.map((post, i) => (
        // @ts-ignore
        <Post key={i} post={post} />
      ))}
    </div>
  );
}

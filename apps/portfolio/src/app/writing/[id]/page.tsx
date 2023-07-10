import { client } from "database";
import React from "react";
import ReactMarkdown from "react-markdown";

async function getPost(postId: string) {
  const post = await client.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return post;
}

export default async function Post(props) {
  const post = await getPost(props.params.id);

  let title = post.title;

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <>
      <div className="p-4">
        <h2>{title}</h2>
        <p>By {post.author.name || "Unknown author"}</p>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </>
  );
}

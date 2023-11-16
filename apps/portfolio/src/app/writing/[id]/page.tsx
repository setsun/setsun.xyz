"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

import { trpc } from "@/utils/trpc";

const Post = ({ id }: { id: string }) => {
  const { data: post } = trpc.post.getPostById.useQuery({ id });

  if (!post) {
    return;
  }

  return (
    <div className="p-4">
      <h2>{post.title}</h2>
      <p>By {post.author.name || "Unknown author"}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default function Writing(props) {
  return (
    <>
      <Post id={props.params.id} />
    </>
  );
}

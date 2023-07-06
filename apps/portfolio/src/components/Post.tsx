"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const router = useRouter();
  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div
      className="border-[1px] p-8 text-white last:mb-0"
      onClick={() => router.push(`/writing/${post.id}`)}
    >
      <h3 className="mb-2">{post.title}</h3>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default Post;

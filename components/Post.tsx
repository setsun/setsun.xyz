import React from "react";
import Router from "next/router";
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
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className="border-b-[1px] text-white p-8 last:mb-0" onClick={() => Router.push("/writing/[id]", `/writing/${post.id}`)}>
      <h3 className="mb-2">{post.title}</h3>
      <small>By {authorName}</small>
      <ReactMarkdown>
       {post.content}
      </ReactMarkdown>
    </div>
  );
};

export default Post;

"use client";

import { gql, useQuery } from "@urql/next";
import React from "react";
import ReactMarkdown from "react-markdown";

const GetPostQuery = gql`
  query ($id: String) {
    getPostById(id: $id) {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

const Post = ({ id }: { id: string }) => {
  const [result] = useQuery({
    query: GetPostQuery,
    variables: { id },
  });

  if (!result.data) {
    return null;
  }

  const post = result.data.getPostById;

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

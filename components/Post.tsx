import React from "react";
import Router from "next/router";
import styled from "styled-components";
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

const Container = styled.div`
  border: 1px solid white;
  color: white;
  padding: 2rem;

  p:last-child {
    margin-bottom: 0;
  }
`;

const PostTitle = styled.h3`
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Container onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <PostTitle>{post.title}</PostTitle>
      <small>By {authorName}</small>
      <ReactMarkdown>
       {post.content}
      </ReactMarkdown>
    </Container>
  );
};

export default Post;

"use client";

import { gql, useQuery } from "@urql/next";
import Link from "next/link";
import { Suspense } from "react";

const ListPostsQuery = gql`
  query {
    listPosts {
      id
      title
      content
      author {
        name
      }
    }
  }
`;

export type PostProps = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  } | null;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => (
  <Link
    className="block h-1/3 w-1/2 border-b border-r p-4"
    href={`/writing/${post.id}`}
  >
    <p className="font-antonio mb-2 text-2xl">{post.title}</p>
  </Link>
);

const Posts = () => {
  const [result] = useQuery({ query: ListPostsQuery });

  if (!result.data) {
    return null;
  }

  const posts = result.data.listPosts;

  return posts.map((post, i) => <Post key={i} post={post} />);
};

export default function Writing() {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b border-r p-4">
        <h2 className="font-antonio mb-2 text-2xl">Writing</h2>
        <p className="font-inter text-xs font-thin">
          Personal musings and technical distillations
        </p>
      </div>

      <Suspense>
        <Posts />
      </Suspense>
    </div>
  );
}

import React from "react"
import { GetStaticProps } from "next"
import Post, { PostProps } from "../../components/Post"
import prisma from "../../lib/prisma";

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
    <div>
      <h2 className="underline mb-2">Recent Posts</h2>
      {props.feed.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
}

export default Blog

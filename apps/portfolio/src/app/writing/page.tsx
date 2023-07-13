import { client } from "database";
import Link from "next/link";

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
    className="block h-1/5 w-full border-b-2 p-4"
    href={`/writing/${post.id}`}
  >
    <p className="font-antonio mb-2 text-2xl">{post.title}</p>
  </Link>
);

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
    <div className="h-screen w-full overflow-y-auto">
      <div className="block w-full border-b-2 p-4">
        <p className="font-antonio text-2xl">Writing</p>
      </div>

      {feed.map((post, i) => (
        // @ts-ignore
        <Post key={i} post={post} />
      ))}
    </div>
  );
}

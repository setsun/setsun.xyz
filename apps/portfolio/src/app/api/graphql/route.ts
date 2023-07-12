import { client } from "database";
import { NextResponse } from "next/server";
import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    name: String
    email: String
    createdAt: Int
    updatedAt: Int
  }

  type Post {
    id: String!
    title: String!
    content: String
    published: Boolean!
    author: User
    authorId: String
  }

  type Query {
    listPosts: [Post!]!
    getPostById(id: String): Post
  }
`;

const resolvers = {
  Query: {
    listPosts: async () => {
      return await client.post.findMany({
        where: { published: true },
        include: {
          author: true,
        },
      });
    },
    getPostById: async (_parent, args: { id: string }) => {
      return await client.post.findUnique({
        where: {
          id: args.id,
        },
        include: {
          author: true,
        },
      });
    },
  },
};

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response: NextResponse },
});

export { handleRequest as GET, handleRequest as POST };

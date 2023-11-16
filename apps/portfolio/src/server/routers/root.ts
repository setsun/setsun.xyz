import { z } from "zod";

import { publicProcedure, router } from "../trpc";

const postRouter = router({
  listPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      where: { published: true },
      include: { author: true },
    });
  }),
  getPostById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: { id: input.id },
        include: { author: true },
      });
    }),
});

// root router
export const rootRouter = router({
  post: postRouter,
});

export type RootRouter = typeof rootRouter;

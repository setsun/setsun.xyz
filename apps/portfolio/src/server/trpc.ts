import { initTRPC } from "@trpc/server";
import { client } from "database";
import { NextRequest } from "next/server";
import superjson from "superjson";

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  return {
    db: client,
  };
};

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

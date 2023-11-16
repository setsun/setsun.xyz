import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { rootRouter } from "@/server/routers/root";
import { createTRPCContext } from "@/server/trpc";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: rootRouter,
    createContext: () => createTRPCContext({ req }),
  });

export { handler as GET, handler as POST };

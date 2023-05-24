import { createTRPCRouter } from "~/server/api/trpc";
import { parserRouter } from "./routers/parser";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  parser: parserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { Readability } from "@mozilla/readability";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const parserRouter = createTRPCRouter({
  parse: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      const html = await fetch(input.url).then((res) => res.text());
      const dom = new JSDOM(html, { url: input.url });

      const { window } = new JSDOM("");
      const DOMPurify = createDOMPurify(window);
      const reader = new Readability(dom.window.document);
      const article = reader.parse();

      if (!article) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to parse page",
        });
      }

      const cleanArticle = DOMPurify.sanitize(article?.content ?? "");

      return { article: { ...article, content: cleanArticle } };
    }),
});

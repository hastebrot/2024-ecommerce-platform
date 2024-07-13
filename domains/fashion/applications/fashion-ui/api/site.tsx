/** @jsx createElement */
import { createElement, renderToString } from "../helper/jsx.ts";
import { Context } from "../model.ts";

// deno-lint-ignore require-await
export const handleSite = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(<div class="m-4">site</div>);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

/** @jsx createElement */
import { Context } from "../model.ts";

// deno-lint-ignore require-await
export const handleSiteRefresh = async (ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const clientTimestamp = url.searchParams.get("timestamp");

  return new Response("", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "hx-refresh":
        clientTimestamp != null && clientTimestamp !== ctx.serverTimestamp ? "true" : "false",
    },
  });
};

import { handleIndex } from "./api/index.tsx";
import { handleSite } from "./api/site.tsx";
import { handleSiteRefresh } from "./api/siteRefresh.tsx";
import { Log } from "./helper/log.ts";

// const indexHtml = Deno.readTextFileSync("public/index.html");
// const indexJs = Deno.readTextFileSync("public/index.js");
const serverTimestamp = Date.now().toString();

export const apiHandler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // if (req.method === "GET" && url.pathname === "/index") {
  //   return new Response(indexHtml, {
  //     headers: {
  //       "content-type": "text/html; charset=utf-8",
  //     },
  //   });
  // }

  // if (req.method === "GET" && url.pathname === "/index.js") {
  //   return new Response(indexJs, {
  //     headers: {
  //       "content-type": "text/javascript; charset=utf-8",
  //     },
  //   });
  // }

  if (req.method === "GET" && url.pathname === "/") {
    Log.debug("request", Log.inspect({ url: req.url }));
    const ctx = { serverTimestamp };
    return await handleIndex(ctx, req);
  }

  if (req.method === "GET" && url.pathname === "/site-refresh") {
    const ctx = { serverTimestamp };
    return await handleSiteRefresh(ctx, req);
  }

  if (req.method === "GET" && url.pathname === "/site") {
    Log.debug("request", Log.inspect({ url: req.url }));
    const ctx = {};
    return await handleSite(ctx, req);
  }

  return new Response(null, { status: 404 });
};

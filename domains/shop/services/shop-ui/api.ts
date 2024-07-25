import { handleIndex } from "./api/index.tsx";
import { handleSite } from "./api/site.tsx";
import { handleSiteRefresh } from "./api/siteRefresh.tsx";
import { Log } from "./helper/log.ts";

const serverTimestamp = Date.now().toString();

export const apiHandler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/") {
    Log.debug("request", Log.inspect({ url: req.url }));
    const ctx = { serverTimestamp };
    return await handleIndex(ctx, req);
  }

  if (req.method === "GET" && url.pathname === "/ui/site") {
    Log.debug("request", Log.inspect({ url: req.url }));
    const ctx = {};
    return await handleSite(ctx, req);
  }

  if (req.method === "GET" && url.pathname === "/ui/site-refresh") {
    const ctx = { serverTimestamp };
    return await handleSiteRefresh(ctx, req);
  }

  return new Response(null, { status: 404 });
};

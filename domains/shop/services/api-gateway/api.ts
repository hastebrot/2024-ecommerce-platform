import { CatalogServiceClient } from "./client.ts";
import { Fmt, Json } from "./helper.ts";
import { ClientContext } from "./types.ts";

const demoWorkspace = "demo";
const workspaceHeader = "X-Workspace";
const responseHeaders = {
  "Content-Type": "application/json;charset=utf-8",
};

export const apiHandler = async (req: Request): Promise<Response> => {
  const startTime = performance.now();
  const url = new URL(req.url);
  const ctx = transformToClientContext(req.headers);

  // catalog service.

  if (req.method === "POST" && url.pathname === "/api/catalog/echo") {
    const input = await req.json();
    const output = await CatalogServiceClient.echo(ctx, input);
    return new Response(writeJson(output, performance.now() - startTime), {
      status: 200,
      headers: responseHeaders,
    });
  }

  if (req.method === "POST" && url.pathname === "/api/catalog/write-product") {
    const input = await req.json();
    const output = await CatalogServiceClient.writeProduct(ctx, input);
    return new Response(writeJson(output, performance.now() - startTime), {
      status: 200,
      headers: responseHeaders,
    });
  }

  if (req.method === "POST" && url.pathname === "/api/catalog/read-products") {
    const input = await req.json();
    const output = await CatalogServiceClient.readProducts(ctx, input);
    return new Response(writeJson(output, performance.now() - startTime), {
      status: 200,
      headers: responseHeaders,
    });
  }

  return new Response(null, { status: 404 });
};

const transformToClientContext = (headers: Headers): ClientContext => {
  return {
    headers: {
      [workspaceHeader]: headers.get(workspaceHeader) ?? demoWorkspace,
    },
  };
};

const writeJson = (output: object, timeMillis: number) => {
  const time = Fmt.millis(timeMillis);
  const size = Fmt.bytes(Json.write(output).length);
  return Json.write({ ...output, time, size });
};

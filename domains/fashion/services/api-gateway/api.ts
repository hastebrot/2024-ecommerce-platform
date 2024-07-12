import { CatalogClient } from "./client.ts";
import { Fmt, Json } from "./helper.ts";

const defaultTenant = "int";

const responseHeaders = {
  "Content-Type": "application/json;charset=utf-8",
};

export const apiHandler = async (req: Request): Promise<Response> => {
  const start = performance.now();
  const url = new URL(req.url);
  const context = transformHeadersToContext(req.headers);

  // catalog service.

  if (req.method === "POST" && url.pathname === "/catalog/echo") {
    const params = await req.json();
    const result = await CatalogClient.echo(params, context);
    const time = Fmt.millis(performance.now() - start);
    const size = Fmt.bytes(Json.write(result).length);
    return new Response(Json.write({ ...result, time, size }), {
      status: 200,
      headers: responseHeaders,
    });
  }

  return new Response(null, { status: 404 });
};

const transformHeadersToContext = (headers: Headers) => {
  return {
    "X-Tenant": headers.get("X-Tenant") ?? defaultTenant,
  };
};

import { ProductStoreClient } from "./client.ts";
import { Json, throwError, Zod } from "./helper.ts";
import * as model from "./model.ts";
import { ClientContext, ServiceContext } from "./types.ts";

const workspaceHeader = "X-Workspace";
const responseHeaders = {
  "Content-Type": "application/json;charset=utf-8",
};

export const apiHandler = async (serviceCtx: ServiceContext, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const ctx = transformToClientContext(serviceCtx, req.headers);

  if (req.method === "POST" && url.pathname === "/echo") {
    const input = Zod.parse(model.EchoRequest, await req.json());
    const output = Zod.parseTyped(model.EchoResponse, {
      ok: true,
      result: { message: input.message },
    });
    return new Response(Json.write(output), {
      status: 200,
      headers: responseHeaders,
    });
  }

  if (req.method === "POST" && url.pathname === "/write-product") {
    const input = Zod.parse(model.WriteProductRequest, await req.json());
    const output = Zod.parseTyped(
      model.WriteProductResponse,
      await ProductStoreClient.writeProduct(ctx, input),
    );
    return new Response(Json.write(output), {
      status: 200,
      headers: responseHeaders,
    });
  }

  if (req.method === "POST" && url.pathname === "/read-products") {
    const input = Zod.parse(model.ReadProductsRequest, await req.json());
    const output = Zod.parseTyped(
      model.ReadProductsResponse,
      await ProductStoreClient.readProducts(ctx, input),
    );
    return new Response(Json.write(output), {
      status: 200,
      headers: responseHeaders,
    });
  }

  return new Response(null, { status: 404 });
};

const transformToClientContext = (ctx: ServiceContext, headers: Headers): ClientContext => {
  return {
    kv: ctx.kv,
    workspace: headers.get(workspaceHeader) ?? throwError(`workspace is missing"`),
  };
};

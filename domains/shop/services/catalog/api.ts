import { ProductStoreClient } from "./client.ts";
import { Json, throwError, Zod } from "./helper.ts";
import {
  ClientContext,
  EchoRequest,
  EchoResponse,
  ReadProductsRequest,
  ReadProductsResponse,
  ServiceContext,
  WriteProductRequest,
  WriteProductResponse,
} from "./model.ts";

const apiMethod = "POST";
const workspaceHeader = "X-Workspace";
const responseHeaders = {
  "Content-Type": "application/json;charset=utf-8",
};

export const apiHandler = async (serviceCtx: ServiceContext, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const ctx = transformToClientContext(serviceCtx, req.headers);

  if (req.method === apiMethod && url.pathname === "/echo") {
    const input = Zod.parse(EchoRequest, await req.json());
    const output = Zod.parse(EchoResponse, {
      ok: true,
      result: { message: input.message },
    });
    return new Response(Json.write(output), { status: 200, headers: responseHeaders });
  }

  if (req.method === apiMethod && url.pathname === "/write-product") {
    const input = Zod.parse(WriteProductRequest, await req.json());
    const output = Zod.parse<unknown, unknown>(
      WriteProductResponse,
      await ProductStoreClient.writeProduct(ctx, input)
    );
    return new Response(Json.write(output), { status: 200, headers: responseHeaders });
  }

  if (req.method === apiMethod && url.pathname === "/read-products") {
    const input = Zod.parse(ReadProductsRequest, await req.json());
    const output = Zod.parse<unknown, unknown>(
      ReadProductsResponse,
      await ProductStoreClient.readProducts(ctx, input)
    );
    return new Response(Json.write(output), { status: 200, headers: responseHeaders });
  }

  return new Response(null, { status: 404 });
};

const transformToClientContext = (ctx: ServiceContext, headers: Headers): ClientContext => {
  return {
    kv: ctx.kv,
    workspace: headers.get(workspaceHeader) ?? throwError(`workspace is missing"`),
  };
};

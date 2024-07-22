import { Json, throwError, Zod } from "./helper.ts";
import { EchoRequest, EchoResponse } from "./model.ts";

const responseHeaders = {
  "Content-Type": "application/json;charset=utf-8",
};

const apiMethod = "POST";

export const apiHandler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const _context = transformHeadersToContext(req.headers);

  if (req.method === apiMethod && url.pathname === "/echo") {
    const input = Zod.parse(EchoRequest, await req.json());
    const output = Zod.parse(EchoResponse, {
      ok: true,
      result: { message: input.message },
    });
    return new Response(Json.write(output), { status: 200, headers: responseHeaders });
  }

  return new Response(null, { status: 404 });
};

const transformHeadersToContext = (headers: Headers) => {
  return {
    tenant: headers.get("X-Tenant") ?? throwError(`X-Tenant is missing"`),
  };
};

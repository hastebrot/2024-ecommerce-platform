import { apiHandler } from "./api.ts";
import { Env, Log } from "./helper.ts";

const domainName = "fashion";
const serviceName = "catalog";
const apiPort = Env.integerOrThrow("PORT");

Deno.serve({
  port: apiPort,
  onListen() {
    Log.debug("http server running", { domainName, serviceName, apiPort });
  },
  handler: async (req: Request) => {
    Log.debug("request", { url: req.url });
    return await apiHandler(req);
  },
});

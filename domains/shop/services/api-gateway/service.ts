import { apiHandler } from "./api.ts";
import { Env, Log } from "./helper.ts";

const domainName = "shop";
const serviceName = "api-gateway";
const apiPort = Env.integerOrThrow("PORT");

if (import.meta.main) {
  Deno.serve({
    port: apiPort,
    onListen() {
      Log.debug("http server running", { domainName, serviceName, apiPort });
    },
    async handler(req: Request) {
      Log.debug("request", { url: req.url });
      return await apiHandler(req);
    },
  });
}

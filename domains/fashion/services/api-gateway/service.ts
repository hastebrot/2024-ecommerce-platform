import { apiHandler } from "./api.ts";
import { Env, Log } from "./helper.ts";

const domainName = "fashion";
const serviceName = "api-gateway";
const apiPort = Env.integerOrThrow("PORT");

if (import.meta.main) {
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
}

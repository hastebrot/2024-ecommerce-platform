import { apiHandler } from "./api.ts";
import { Env, Log } from "./helper.ts";

const domainName = "shop";
const serviceName = "catalog";
const apiPort = Env.integerOrThrow("PORT");

if (import.meta.main) {
  const kv = await Deno.openKv("./denokv.sqlite");
  const http = Deno.serve({
    port: apiPort,
    onListen() {
      Log.debug("http server running", { domainName, serviceName, apiPort });
    },
    async handler(req: Request) {
      Log.debug("request", { url: req.url });
      return await apiHandler({ kv }, req);
    },
  });

  const handleShutdown = async () => {
    await http[Symbol.asyncDispose]();
    kv[Symbol.dispose]();
    Deno.exit();
  };
  Deno.addSignalListener("SIGINT", handleShutdown);
  Deno.addSignalListener("SIGTERM", handleShutdown);
}

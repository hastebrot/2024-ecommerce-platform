import * as orama from "@orama/orama";
import { Env, Log } from "./helper.ts";

const domainName = "shop";
const serviceName = "searcher";
const apiPort = Env.integerOrThrow("PORT");

if (import.meta.main) {
  const productSchema = {
    name: "string",
    price: "number",
  } as const;
  const docs = await orama.create({
    schema: productSchema,
  });
  await orama.insert(docs, {
    name: "bio banana",
    price: 1.23,
  });
  await orama.insert(docs, {
    name: "bio strawberry",
    price: 4.56,
  });
  const results = await orama.search(docs, {
    term: "bio",
    where: {
      price: { lt: 2.0 },
    },
  });
  console.log(results);

  Deno.serve({
    port: apiPort,
    onListen() {
      Log.debug("http server running", { domainName, serviceName, apiPort });
    },
    handler(req: Request) {
      Log.debug("request", { url: req.url });
      return new Response(null, { status: 200 });
    },
  });
}

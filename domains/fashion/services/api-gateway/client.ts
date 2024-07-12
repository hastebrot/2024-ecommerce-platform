import { Json } from "./helper.ts";

const apiMethod = "POST";
const catalogAddr = "localhost:8081";

type Params = unknown;
type Context = Record<string, string>;

const requestHeaders = {
  "Content-Type": "application/json;charset=utf-8",
  "Cache-Control": "no-transform",
};

export const CatalogClient = {
  async echo(params: Params, context?: Context) {
    const url = new URL(`http://${catalogAddr}/echo`);
    const res = await fetch(url, {
      method: apiMethod,
      body: Json.write(params),
      headers: { ...requestHeaders, ...context },
    });
    return await res.json();
  },
};

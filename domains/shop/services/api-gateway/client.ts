import { Json } from "./helper.ts";
import { ClientContext } from "./types.ts";

const apiMethod = "POST";
const catalogAddr = "localhost:8081";

const requestHeaders = {
  "Content-Type": "application/json;charset=utf-8",
  "Cache-Control": "no-transform",
};

type Input = unknown;

export const CatalogServiceClient = {
  async echo(ctx: ClientContext, input: Input) {
    const url = new URL(`http://${catalogAddr}/echo`);
    const res = await fetch(url, {
      method: apiMethod,
      body: Json.write(input),
      headers: { ...requestHeaders, ...ctx.headers },
    });
    return await res.json();
  },

  async writeProduct(ctx: ClientContext, input: Input) {
    const url = new URL(`http://${catalogAddr}/write-product`);
    const res = await fetch(url, {
      method: apiMethod,
      body: Json.write(input),
      headers: { ...requestHeaders, ...ctx.headers },
    });
    return await res.json();
  },

  async readProducts(ctx: ClientContext, input: Input) {
    const url = new URL(`http://${catalogAddr}/read-products`);
    const res = await fetch(url, {
      method: apiMethod,
      body: Json.write(input),
      headers: { ...requestHeaders, ...ctx.headers },
    });
    return await res.json();
  },
};

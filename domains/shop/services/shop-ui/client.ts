import { Zod } from "./helper/zod.ts";
import * as model from "./model.ts";

const apiGatewayAddr = "localhost:8080";
const requestHeaders = {
  "Content-Type": "application/json;charset=utf-8",
  "Cache-Control": "no-transform",
  "X-Workspace": "demo",
};

export const CatalogClient = {
  async readProducts() {
    const url = new URL(`http://${apiGatewayAddr}/api/catalog/read-products`);
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
      headers: requestHeaders,
    });
    const json = await res.json();
    return Zod.parse(model.ReadProductsResponse, json);
  },
};

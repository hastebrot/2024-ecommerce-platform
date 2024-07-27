import { nanoid } from "../deps.ts";
import { consumeJson, fetchPost } from "../test.ts";

const apiGatewayAddr = "localhost:8080";
const demoWorkspace = "demo";

Deno.test("demo write products", async () => {
  const products = [
    {
      id: nanoid.nanoid(),
      productTitle: "Bio Banane ca. 200g",
    },
    {
      id: nanoid.nanoid(),
      productTitle: "Heidelbeeren 500g",
    },
    {
      id: nanoid.nanoid(),
      productTitle: "Bio Joghurt mild 3,8% 500g",
    },
    {
      id: nanoid.nanoid(),
      productTitle: "Eisbergsalat 1 Stück",
    },
    {
      id: nanoid.nanoid(),
      productTitle: "Honigmelone 1 Stück",
    },
    {
      id: nanoid.nanoid(),
      productTitle: "Bio Erdbeeren 300g",
    },
  ];

  for (const product of products) {
    await consumeJson(
      await fetchPost({
        url: `http://${apiGatewayAddr}/api/catalog/write-product`,
        headers: {
          "x-workspace": demoWorkspace,
        },
        bodyParams: {
          product,
        },
      })
    );
  }
});

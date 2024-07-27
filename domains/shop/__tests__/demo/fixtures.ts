import { consumeJson, fetchPost } from "../test.ts";

const apiGatewayAddr = "localhost:8080";
const demoWorkspace = "demo";

Deno.test("demo write products", async () => {
  const products = [
    {
      id: "1",
      productTitle: "Bio Banane ca. 200g",
    },
    {
      id: "2",
      productTitle: "Heidelbeeren 500g",
    },
    {
      id: "3",
      productTitle: "Bio Joghurt mild 3,8% 500g",
    },
    {
      id: "4",
      productTitle: "Eisbergsalat 1 Stück",
    },
    {
      id: "5",
      productTitle: "Honigmelone 1 Stück",
    },
    {
      id: "6",
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

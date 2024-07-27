import { consumeJson, fetchPost } from "../test.ts";

const apiGatewayAddr = "localhost:8080";
const demoWorkspace = "demo";

Deno.test("demo write products", async () => {
  const categoryObstGemuese = { id: "obst-gemuese", category: "Obst & Gemüse" };
  const categoryFrischesObst = { id: "frisches-obst", category: "Frisches Obst" };
  const attributeBio = { id: "bio", attribute: "Bio" };
  const attributeGesponsert = { id: "gesponsert", attribute: "Gesponsert" };
  const attributeTiefpreis = { id: "tiefpreis", attribute: "Tiefpreis" };
  const attributeRegional = { id: "regional", attribute: "Regional" };

  const products = [
    {
      productNumber: "1",
      productTitle: "Bio Banane ca. 200g",
      categoryPath: [categoryObstGemuese, categoryFrischesObst],
      attributeList: [attributeBio],
    },
    {
      productNumber: "2",
      productTitle: "Heidelbeeren 500g",
      categoryPath: [categoryObstGemuese, categoryFrischesObst],
      attributeList: [attributeGesponsert],
    },
    {
      productNumber: "3",
      productTitle: "Bio Joghurt mild 3,8% 500g",
      categoryPath: [categoryObstGemuese, categoryFrischesObst],
      attributeList: [attributeBio, attributeGesponsert],
    },
    {
      productNumber: "4",
      productTitle: "Eisbergsalat 1 Stück",
      categoryPath: [categoryObstGemuese, categoryFrischesObst],
      attributeList: [],
    },
    {
      productNumber: "5",
      productTitle: "Honigmelone 1 Stück",
      categoryPath: [categoryObstGemuese, categoryFrischesObst],
      attributeList: [attributeTiefpreis],
    },
    {
      productNumber: "6",
      productTitle: "Bio Erdbeeren 300g",
      categoryPath: [categoryObstGemuese, categoryFrischesObst],
      attributeList: [attributeBio, attributeRegional],
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

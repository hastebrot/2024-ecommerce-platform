import { assert } from "../deps.ts";
import { consumeJson, fetchPost } from "../test.ts";

const apiGatewayAddr = "localhost:8080";
const testWorkspace = "test";

Deno.test("write and read products", async () => {
  const data = {
    input: [
      {
        product: {
          productNumber: "1",
          productTitle: "product title",
          categoryPath: [],
          attributeList: [],
        },
      },
      {
        product: {
          productNumber: "2",
          productTitle: "other product title",
          categoryPath: [],
          attributeList: [],
        },
      },
    ],
    output: {
      ok: true,
      result: {
        products: [
          {
            productNumber: "1",
            productTitle: "product title",
            categoryPath: [],
            attributeList: [],
          },
          {
            productNumber: "2",
            productTitle: "other product title",
            categoryPath: [],
            attributeList: [],
          },
        ],
      },
      count: {
        products: 2,
      },
    },
  };

  // when:
  for (const input of data.input) {
    await consumeJson(
      await fetchPost({
        url: `http://${apiGatewayAddr}/api/catalog/write-product`,
        headers: {
          "x-workspace": testWorkspace,
        },
        bodyParams: input,
      })
    );
  }

  // then:
  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/api/catalog/read-products`,
    headers: {
      "x-workspace": testWorkspace,
    },
    bodyParams: {},
  });
  const output = await consumeJson<object>(res);
  assert.assertObjectMatch(output, data.output);
});

Deno.test("read products with category filter", async () => {
  const data = {
    input: [
      {
        product: {
          productNumber: "1",
          productTitle: "product title",
          categoryPath: [{ id: "category-1", category: "Category 1" }],
          attributeList: [],
        },
      },
      {
        product: {
          productNumber: "2",
          productTitle: "other product title",
          categoryPath: [],
          attributeList: [],
        },
      },
    ],
    output: {
      ok: true,
      result: {
        products: [
          {
            productNumber: "1",
            productTitle: "product title",
            categoryPath: [{ id: "category-1", category: "Category 1" }],
            attributeList: [],
          },
        ],
      },
      count: {
        products: 1,
      },
    },
  };

  // when:
  for (const input of data.input) {
    await consumeJson(
      await fetchPost({
        url: `http://${apiGatewayAddr}/api/catalog/write-product`,
        headers: {
          "x-workspace": testWorkspace,
        },
        bodyParams: input,
      })
    );
  }

  // then:
  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/api/catalog/read-products`,
    headers: {
      "x-workspace": testWorkspace,
    },
    bodyParams: {
      category: "category-1",
    },
  });
  const output = await consumeJson<object>(res);
  assert.assertObjectMatch(output, data.output);
});

Deno.test("read products with attributes filter", async () => {
  const data = {
    input: [
      {
        product: {
          productNumber: "1",
          productTitle: "product title",
          categoryPath: [],
          attributeList: [{ id: "attribute-1", attribute: "Attribute 1" }],
        },
      },
      {
        product: {
          productNumber: "2",
          productTitle: "other product title",
          categoryPath: [],
          attributeList: [],
        },
      },
    ],
    output: {
      ok: true,
      result: {
        products: [
          {
            productNumber: "1",
            productTitle: "product title",
            categoryPath: [],
            attributeList: [{ id: "attribute-1", attribute: "Attribute 1" }],
          },
        ],
      },
      count: {
        products: 1,
      },
    },
  };

  // when:
  for (const input of data.input) {
    await consumeJson(
      await fetchPost({
        url: `http://${apiGatewayAddr}/api/catalog/write-product`,
        headers: {
          "x-workspace": testWorkspace,
        },
        bodyParams: input,
      })
    );
  }

  // then:
  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/api/catalog/read-products`,
    headers: {
      "x-workspace": testWorkspace,
    },
    bodyParams: {
      attributes: ["attribute-1"],
    },
  });
  const output = await consumeJson<object>(res);
  assert.assertObjectMatch(output, data.output);
});

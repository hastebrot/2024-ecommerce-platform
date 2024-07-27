import { assert } from "../deps.ts";
import { consumeJson, fetchPost } from "../test.ts";

const apiGatewayAddr = "localhost:8080";
const testWorkspace = "test";

Deno.test("write and read products", async () => {
  // when:
  await consumeJson(
    await fetchPost({
      url: `http://${apiGatewayAddr}/api/catalog/write-product`,
      headers: {
        "x-workspace": testWorkspace,
      },
      bodyParams: {
        product: {
          productNumber: "1",
          productTitle: "product title",
          categoryPath: [],
          attributeList: [],
        },
      },
    })
  );
  await consumeJson(
    await fetchPost({
      url: `http://${apiGatewayAddr}/api/catalog/write-product`,
      headers: {
        "x-workspace": testWorkspace,
      },
      bodyParams: {
        product: {
          productNumber: "2",
          productTitle: "other product title",
          categoryPath: [],
          attributeList: [],
        },
      },
    })
  );

  // then:
  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/api/catalog/read-products`,
    headers: {
      "x-workspace": testWorkspace,
    },
    bodyParams: {},
  });
  assert.assertObjectMatch(await consumeJson(res), {
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
  });
});

Deno.test("read products with category filter", async () => {
  await consumeJson(
    await fetchPost({
      url: `http://${apiGatewayAddr}/api/catalog/write-product`,
      headers: {
        "x-workspace": testWorkspace,
      },
      bodyParams: {
        product: {
          productNumber: "1",
          productTitle: "product title",
          categoryPath: [{ id: "category-1", category: "Category 1" }],
          attributeList: [],
        },
      },
    })
  );
  await consumeJson(
    await fetchPost({
      url: `http://${apiGatewayAddr}/api/catalog/write-product`,
      headers: {
        "x-workspace": testWorkspace,
      },
      bodyParams: {
        product: {
          productNumber: "2",
          productTitle: "other product title",
          categoryPath: [],
          attributeList: [],
        },
      },
    })
  );

  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/api/catalog/read-products`,
    headers: {
      "x-workspace": testWorkspace,
    },
    bodyParams: {
      category: "category-1",
    },
  });
  assert.assertObjectMatch(await consumeJson(res), {
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
  });
});

Deno.test("read products with attributes filter", async () => {
  await consumeJson(
    await fetchPost({
      url: `http://${apiGatewayAddr}/api/catalog/write-product`,
      headers: {
        "x-workspace": testWorkspace,
      },
      bodyParams: {
        product: {
          productNumber: "1",
          productTitle: "product title",
          categoryPath: [],
          attributeList: [{ id: "attribute-1", attribute: "Attribute 1" }],
        },
      },
    })
  );
  await consumeJson(
    await fetchPost({
      url: `http://${apiGatewayAddr}/api/catalog/write-product`,
      headers: {
        "x-workspace": testWorkspace,
      },
      bodyParams: {
        product: {
          productNumber: "2",
          productTitle: "other product title",
          categoryPath: [],
          attributeList: [],
        },
      },
    })
  );

  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/api/catalog/read-products`,
    headers: {
      "x-workspace": testWorkspace,
    },
    bodyParams: {
      attributes: ["attribute-1"],
    },
  });
  assert.assertObjectMatch(await consumeJson(res), {
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
  });
});

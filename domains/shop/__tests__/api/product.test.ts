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
          id: "1",
          productTitle: "product title",
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
          id: "2",
          productTitle: "other product title",
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
          id: "1",
          productTitle: "product title",
        },
        {
          id: "2",
          productTitle: "other product title",
        },
      ],
    },
    count: {
      products: 2,
    },
  });
});

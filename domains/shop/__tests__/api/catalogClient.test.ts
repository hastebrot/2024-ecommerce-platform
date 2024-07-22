import { assert } from "../deps.ts";
import { consumeJson, defaultTenantTest, fetchPost } from "../helper.ts";

const apiGatewayAddr = "localhost:8080";
const catalogAddr = "localhost:8081";

Deno.test("api-gateway echo", async () => {
  // when:
  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/catalog/echo`,
    headers: {
      "x-tenant": defaultTenantTest,
    },
    bodyParams: {
      message: "hello",
    },
  });

  // then:
  assert.assertObjectMatch(await consumeJson(res), {
    ok: true,
    result: {
      message: "hello",
    },
  });
});

Deno.test("catalog echo", async () => {
  // when:
  const res = await fetchPost({
    url: `http://${catalogAddr}/echo`,
    headers: {
      "x-tenant": defaultTenantTest,
    },
    bodyParams: {
      message: "hello",
    },
  });

  // then:
  assert.assertObjectMatch(await consumeJson(res), {
    ok: true,
    result: {
      message: "hello",
    },
  });
});

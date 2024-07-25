import { assert } from "../deps.ts";
import { consumeJson, fetchPost } from "../helper.ts";

const apiGatewayAddr = "localhost:8080";
const catalogAddr = "localhost:8081";
const testWorkspace = "test";

Deno.test("api-gateway echo", async () => {
  // when:
  const res = await fetchPost({
    url: `http://${apiGatewayAddr}/api/catalog/echo`,
    headers: {
      "x-workspace": testWorkspace,
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
      "x-workspace": testWorkspace,
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

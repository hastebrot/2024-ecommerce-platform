import { assert } from "../deps.ts";
import { $, $$, fetchGet, parseDocument } from "../helper.ts";

const shopUiAddr = "localhost:8082";

Deno.test("fetch product-listing", async () => {
  // when:
  const res = await fetchGet({
    url: `http://${shopUiAddr}/site`,
    urlParams: { page: "product-listing" },
  });
  assert.assertEquals(res.status, 200);
  const html = await res.text();
  const document = await parseDocument(html);

  // then:
  const products = $$(document.body, ".product");
  assert.assertEquals(products.length, 6);

  const p = products[0];
  assert.assertEquals($(p, ".product-details h4").textContent, "Bio Banane ca. 200g");
});

Deno.test("fetch product-details", async () => {
  // when:
  const res = await fetchGet({
    url: `http://${shopUiAddr}/site`,
    urlParams: { page: "product-details" },
  });
  assert.assertEquals(res.status, 200);
  const html = await res.text();
  const document = await parseDocument(html);

  // then:
  const p = $(document.body, ".product-details");
  assert.assertEquals($(p, "h1").textContent, "Heidelbeeren 500g");
});

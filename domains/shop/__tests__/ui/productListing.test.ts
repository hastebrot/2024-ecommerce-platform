import { assert } from "../deps.ts";
import { fetchGet, parseDocument, query, queryAll } from "../helper.ts";

const shopUiAddr = "localhost:8082";

Deno.test("fetch product-listing", async () => {
  // when:
  const res = await fetchGet({
    url: `http://${shopUiAddr}/ui/site`,
    urlParams: { page: "product-listing" },
  });
  assert.assertEquals(res.status, 200);
  const html = await res.text();
  const document = await parseDocument(html);

  // then:
  const title = query(document.body, "title");
  assert.assertEquals(title.textContent, "product-listing · shop-ui");

  const products = queryAll(document.body, ".product");
  assert.assertEquals(products.length, 6);

  const h4 = query(products[0], ".product-details h4");
  assert.assertEquals(h4.textContent, "Bio Banane ca. 200g");
});

Deno.test("fetch product-details", async () => {
  // when:
  const res = await fetchGet({
    url: `http://${shopUiAddr}/ui/site`,
    urlParams: { page: "product-details" },
  });
  assert.assertEquals(res.status, 200);
  const html = await res.text();
  const document = await parseDocument(html);

  // then:
  const title = query(document.body, "title");
  assert.assertEquals(title.textContent, "product-details · shop-ui");

  const h1 = query(document.body, ".product-details h1");
  assert.assertEquals(h1.textContent, "Heidelbeeren 500g");
});

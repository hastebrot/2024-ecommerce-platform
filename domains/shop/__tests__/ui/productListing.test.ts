import { assert } from "../deps.ts";
import { fetchGet, parseDocument, query, queryAll } from "../test.ts";

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

  const resultsText = query(document.body, ".display-options .results-text");
  assert.assertEquals(resultsText.childNodes[1]?.textContent, "6 Artikel");
});

Deno.test("fetch product-listing with category and attributes", async () => {
  // when:
  const res = await fetchGet({
    url: `http://${shopUiAddr}/ui/site`,
    urlParams: [
      ["page", "product-listing"],
      ["category", "frisches-obst"],
      ["attribute", "bio"],
      ["attribute", "vegan"],
    ],
  });
  assert.assertEquals(res.status, 200);
  const html = await res.text();
  const document = await parseDocument(html);

  // then:
  const products = queryAll(document.body, ".product");
  assert.assertEquals(products.length, 3);

  const h4 = query(products[0], ".product-details h4");
  assert.assertEquals(h4.textContent, "Bio Banane ca. 200g");

  const resultsText = query(document.body, ".display-options .results-text");
  assert.assertEquals(resultsText.childNodes[1]?.textContent, "3 Artikel");
});

Deno.test("fetch product-listing with category and breadcrumbs", async () => {
  // when:
  const res = await fetchGet({
    url: `http://${shopUiAddr}/ui/site`,
    urlParams: [
      ["page", "product-listing"],
      ["category", "frisches-obst"],
    ],
  });
  assert.assertEquals(res.status, 200);
  const html = await res.text();
  const document = await parseDocument(html);

  // then:
  const breadcrumbs = query(document.body, ".breadcrumbs");
  const breadcrumbsLinks = queryAll(breadcrumbs, ".breadcrumbs-link");
  const breadcrumbsItems = queryAll(breadcrumbs, ".breadcrumbs-item");
  assert.assertEquals(breadcrumbsLinks.length, 3);
  assert.assertEquals(breadcrumbsItems.length, 1);
  assert.assertEquals(breadcrumbsLinks[0].textContent, "Zurück");
  assert.assertEquals(breadcrumbsLinks[1].textContent, "Obst & Gemüse");
  assert.assertEquals(breadcrumbsLinks[2].textContent, "Frisches Obst");
  assert.assertEquals(breadcrumbsItems[0].textContent, "Bananen");
});

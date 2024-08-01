import { assert } from "../deps.ts";
import { fetchGet, parseDocument, query, queryAll } from "../test.ts";

const shopUiAddr = "localhost:8082";

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

Deno.test("fetch product-details with category and breadcrumbs", async () => {
  // when:
  const res = await fetchGet({
    url: `http://${shopUiAddr}/ui/site`,
    urlParams: [
      ["page", "product-details"],
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

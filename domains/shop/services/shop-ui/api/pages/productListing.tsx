/** @jsx createElement */
import { CatalogClient } from "../../client.ts";
import { createElement, renderToString } from "../../helper/jsx.ts";
import { Context } from "../../types.ts";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { CategoriesNavigation } from "../components/CategoriesNavigation.tsx";
import { DisplayOptions } from "../components/DisplayOptions.tsx";
import { FacetedProductList } from "../components/FacetedProductList.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Page } from "../components/Page.tsx";
import { ShoppingHeader } from "../components/ShoppingHeader.tsx";

export const handleProductListing = async (_ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const attributes = url.searchParams.getAll("attribute");
  const productsResult = await CatalogClient.readProducts({
    category,
    attributes,
  });
  const products = productsResult.result.products;
  const html = renderToString(
    <Page>
      <title hx-swap-oob="innerHTML:title">product-listing &middot; shop-ui</title>

      {/* header. */}
      <Header />
      <ShoppingHeader />
      <CategoriesNavigation />

      {/* page content. */}
      <Breadcrumbs />
      <DisplayOptions products={products} />
      <FacetedProductList products={products} />

      {/* footer. */}
      <Footer />
    </Page>
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

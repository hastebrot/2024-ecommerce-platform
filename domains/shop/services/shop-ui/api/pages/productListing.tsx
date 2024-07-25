/** @jsx createElement */
import { createElement, renderToString } from "../../helper/jsx.ts";
import { Context } from "../../model.ts";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { CategoriesNavigation } from "../components/CategoriesNavigation.tsx";
import { DisplayOptions } from "../components/DisplayOptions.tsx";
import { FacetedProductList } from "../components/FacetedProductList.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Page } from "../components/Page.tsx";
import { ShoppingHeader } from "../components/ShoppingHeader.tsx";

// deno-lint-ignore require-await
export const handleProductListing = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(
    <Page>
      <title hx-swap-oob="innerHTML:title">product-listing &middot; shop-ui</title>

      {/* header. */}
      <Header />
      <ShoppingHeader />
      <CategoriesNavigation />

      {/* page content. */}
      <Breadcrumbs />
      <DisplayOptions />
      <FacetedProductList />

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

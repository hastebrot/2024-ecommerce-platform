/** @jsx createElement */
import { createElement, renderToString } from "../../helper/jsx.ts";
import { Context } from "../../types.ts";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { CategoriesNavigation } from "../components/CategoriesNavigation.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Page } from "../components/Page.tsx";
import {
  FooterNewsletter,
  ProductDetails,
  ProductRecommendations,
} from "../components/ProductDetails.tsx";
import { ShoppingHeader } from "../components/ShoppingHeader.tsx";

// deno-lint-ignore require-await
export const handleProductDetails = async (_ctx: Context, _req: Request): Promise<Response> => {
  const categoryPath = [
    { id: "obst-gemuese", category: "Obst & Gemüse" },
    { id: "frisches-obst", category: "Frisches Obst" },
    { id: "bananen", category: "Bananen" },
  ];

  const html = renderToString(
    <Page>
      <title hx-swap-oob="innerHTML:title">product-details &middot; shop-ui</title>

      {/* header. */}
      <Header />
      <ShoppingHeader />
      <CategoriesNavigation />

      {/* page content. */}
      <Breadcrumbs categoryPath={categoryPath} />
      <ProductDetails />
      <ProductRecommendations />

      {/* footer. */}
      <FooterNewsletter />
      <Footer />
    </Page>,
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

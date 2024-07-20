/** @jsx createElement */
import { createElement, renderToString } from "../../helper/jsx.ts";
import { Context } from "../../model.ts";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { CategoriesNavigation } from "../components/CategoriesNavigation.tsx";
import { DisplayOptions } from "../components/DisplayOptions.tsx";
import { FacetedProductList } from "../components/FacetedProductList.tsx";
import { Footer } from "../components/Footer.tsx";
import { HeaderContent } from "../components/HeaderContent.tsx";
import { ShoppingInteractions } from "../components/ShoppingInteractions.tsx";

// deno-lint-ignore require-await
export const handleProductListing = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(
    <div class="bg-[#fbfaf9] [font-stretch:95%]">
      <HeaderContent />
      <ShoppingInteractions />
      <CategoriesNavigation />
      <Breadcrumbs />
      <DisplayOptions />
      <FacetedProductList />
      <Footer />
    </div>
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

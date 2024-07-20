/** @jsx createElement */
import { createElement, renderToString } from "../../helper/jsx.ts";
import { Context } from "../../model.ts";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { CategoriesNavigation } from "../components/CategoriesNavigation.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { ShoppingHeader } from "../components/ShoppingHeader.tsx";

// deno-lint-ignore require-await
export const handleProductDetails = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(
    <div class="bg-[#fbfaf9] [font-stretch:95%]">
      {/* header. */}
      <Header />
      <ShoppingHeader />
      <CategoriesNavigation />

      {/* page content. */}
      <Breadcrumbs />

      {/* footer. */}
      <Footer />
    </div>
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

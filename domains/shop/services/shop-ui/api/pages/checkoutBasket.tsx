/** @jsx createElement */
import { createElement, renderToString } from "../../helper/jsx.ts";
import { Context } from "../../types.ts";
import {
  CheckoutFooter,
  CheckoutHeader,
  CheckoutPageContent,
} from "../components/CheckoutBasket.tsx";
import { Page } from "../components/Page.tsx";

// deno-lint-ignore require-await
export const handleCheckoutBasket = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(
    <Page>
      <title hx-swap-oob="innerHTML:title">checkout-basket &middot; shop-ui</title>

      {/* header. */}
      <CheckoutHeader />

      {/* page content. */}
      <CheckoutPageContent />

      {/* footer. */}
      <CheckoutFooter />
    </Page>
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

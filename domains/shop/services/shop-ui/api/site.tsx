import { Context } from "../model.ts";
import { handleCheckoutBasket } from "./pages/checkoutBasket.tsx";
import { handleProductDetails } from "./pages/productDetails.tsx";
import { handleProductListing } from "./pages/productListing.tsx";

export const handleSite = async (ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get("page");

  if (pageParam === "product-listing") {
    return await handleProductListing(ctx, req);
  }
  if (pageParam === "product-details") {
    return await handleProductDetails(ctx, req);
  }
  if (pageParam === "checkout-basket") {
    return await handleCheckoutBasket(ctx, req);
  }

  return await handleProductListing(ctx, req);
};

import { z } from "./helper.ts";
import { ClientContext, Product, ReadProductsRequest, WriteProductRequest } from "./model.ts";

export const ProductStoreClient = {
  async writeProduct(ctx: ClientContext, input: z.infer<typeof WriteProductRequest>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const product = transformToProduct(input);
    await ctx.kv.set([...workspaceKey, "products", product.id], product);
    return {
      ok: true,
      id: product.id,
    };
  },

  async readProducts(ctx: ClientContext, _input: z.infer<typeof ReadProductsRequest>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const entries = ctx.kv.list(
      {
        prefix: [...workspaceKey, "products"],
      },
      { limit: 100 }
    );
    const products = [];
    for await (const entry of entries) {
      products.push(Product.parse(entry.value));
    }
    return {
      ok: true,
      result: { products },
      count: { products: products.length },
    };
  },
};

const toWorkspaceKey = (ctx: ClientContext): string[] => {
  return [`workspace-${ctx.workspace}`];
};

const transformToProduct = (input: z.infer<typeof WriteProductRequest>): Product => {
  const now = new Date();
  return Product.parse({
    ...input.product,
    createdDate: input.product.createdDate ?? now.toISOString(),
    lastModifiedDate: now.toISOString(),
  });
};

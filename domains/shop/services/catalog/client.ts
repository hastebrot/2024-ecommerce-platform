import { z, Zod } from "./helper.ts";
import { ClientContext, Product, ReadProductsRequest, WriteProductRequest } from "./model.ts";

type Input = Record<string, unknown>;

export const ProductStoreClient = {
  async writeProduct(ctx: ClientContext, params: z.infer<typeof WriteProductRequest>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const product = transformToProduct(params.product);
    await ctx.kv.set([...workspaceKey, "products", product.id], product);
    return {
      ok: true,
      id: product.id,
    };
  },

  async readProducts(ctx: ClientContext, _params: z.infer<typeof ReadProductsRequest>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const entries = ctx.kv.list(
      { prefix: [...workspaceKey, "products"] },
      {
        limit: 100,
      }
    );
    const products = [];
    for await (const entry of entries) {
      products.push(Zod.parse(Product, entry.value));
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

const transformToProduct = (input: Input): Product => {
  const now = new Date();
  return Zod.parse(Product, {
    ...input,
    createdDate: input.createdDate ?? now.toISOString(),
    lastModifiedDate: now.toISOString(),
  });
};

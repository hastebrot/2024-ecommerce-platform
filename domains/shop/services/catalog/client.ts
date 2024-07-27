import { z, Zod } from "./helper.ts";
import { ClientContext, Product, ReadProductsRequest, WriteProductRequest } from "./model.ts";

type Input = Record<string, unknown>;

export const ProductStoreClient = {
  async writeProduct(ctx: ClientContext, params: z.infer<typeof WriteProductRequest>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const product = transformToProduct(params.product);
    await ctx.kv.set([...workspaceKey, "products", product.productNumber], product);
    return {
      ok: true,
    };
  },

  async readProducts(ctx: ClientContext, params: z.infer<typeof ReadProductsRequest>) {
    const hasCategory = (product: z.infer<typeof Product>, categoryId: string) => {
      return product.categoryPath.some((category) => {
        return category.id === categoryId;
      });
    };
    const hasAttribute = (product: z.infer<typeof Product>, attributeIds: string[]) => {
      return product.attributeList.some((attribute) => {
        return attributeIds.includes(attribute.id);
      });
    };
    const workspaceKey = toWorkspaceKey(ctx);
    const selector = { prefix: [...workspaceKey, "products"] };
    const entries = ctx.kv.list(selector, { limit: 100 });
    const products = [];
    for await (const entry of entries) {
      const product = Zod.parse(Product, entry.value);
      if (params.category?.length) {
        if (!hasCategory(product, params.category)) {
          continue;
        }
      }
      if (params.attributes?.length) {
        if (!hasAttribute(product, params.attributes)) {
          continue;
        }
      }
      products.push(product);
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

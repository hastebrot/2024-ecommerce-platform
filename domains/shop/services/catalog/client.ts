import { Zod } from "./helper.ts";
import * as model from "./model.ts";
import { ClientContext } from "./types.ts";

type Input = Record<string, unknown>;

export const ProductStoreClient = {
  async writeProduct(ctx: ClientContext, params: model.WriteProductRequest) {
    const workspaceKey = toWorkspaceKey(ctx);
    const product = transformToProduct(params.product);
    await ctx.kv.set([...workspaceKey, "products", product.productNumber], product);
    return {
      ok: true,
    };
  },

  async readProducts(ctx: ClientContext, params: model.ReadProductsRequest) {
    const hasCategory = (product: model.Product, categoryId: string) => {
      return product.categoryPath.some((category) => {
        return category.id === categoryId;
      });
    };
    const hasAttribute = (product: model.Product, attributeIds: string[]) => {
      return product.attributeList.some((attribute) => {
        return attributeIds.includes(attribute.id);
      });
    };
    const workspaceKey = toWorkspaceKey(ctx);
    const selector = { prefix: [...workspaceKey, "products"] };
    const entries = ctx.kv.list(selector, { limit: 100 });
    const products = [];
    let categoryPath: model.Category[] = [];
    for await (const entry of entries) {
      const product = Zod.parse(model.Product, entry.value);
      if (params.category?.length && categoryPath.length === 0) {
        if (hasCategory(product, params.category)) {
          categoryPath = product.categoryPath;
        }
      }
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
      result: {
        products,
        categoryPath,
      },
      count: {
        products: products.length,
      },
    };
  },
};

const toWorkspaceKey = (ctx: ClientContext): string[] => {
  return [`workspace-${ctx.workspace}`];
};

const transformToProduct = (input: Input): model.Product => {
  const now = new Date();
  return Zod.parse(model.Product, {
    ...input,
    createdDate: input.createdDate ?? now.toISOString(),
    lastModifiedDate: now.toISOString(),
  });
};

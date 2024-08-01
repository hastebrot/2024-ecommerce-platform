import { z, Zod } from "./helper.ts";

// MESSAGES.

export type Echo = z.infer<typeof Echo>;
export const Echo = Zod.object("Echo", {
  message: z.string(),
});

export type Product = z.infer<typeof Product>;
export const Product = Zod.object("Product", {
  productNumber: z.string(),
  productTitle: z.string(),
  categoryPath: z.array(z.lazy(() => Category)),
  attributeList: z.array(z.lazy(() => Attribute)),
  createdDate: z.string().optional(),
  lastModifiedDate: z.string().optional(),
});

export type Category = z.infer<typeof Category>;
export const Category = Zod.object("Category", {
  id: z.string(),
  category: z.string(),
});

export type Attribute = z.infer<typeof Attribute>;
export const Attribute = Zod.object("Attribute", {
  id: z.string(),
  attribute: z.string(),
});

// ENDPOINT MESSAGES.

export type EchoRequest = z.infer<typeof EchoRequest>;
export const EchoRequest = Zod.schema("EchoRequest", Echo);

export type EchoResponse = z.infer<typeof EchoResponse>;
export const EchoResponse = Zod.schema(
  "EchoResponse",
  z.object({
    ok: z.boolean(),
    result: Echo,
  }),
);

export type WriteProductRequest = z.infer<typeof WriteProductRequest>;
export const WriteProductRequest = Zod.object("WriteProductRequest", {
  product: Product,
});

export type WriteProductResponse = z.infer<typeof WriteProductResponse>;
export const WriteProductResponse = Zod.object("WriteProductResponse", {
  ok: z.boolean(),
});

export type ReadProductsRequest = z.infer<typeof ReadProductsRequest>;
export const ReadProductsRequest = Zod.object("ReadProductsRequest", {
  category: z.nullable(Category.shape["id"]).optional(),
  attributes: z.array(Attribute.shape["id"]).optional(),
});

export type ReadProductsResponse = z.infer<typeof ReadProductsResponse>;
export const ReadProductsResponse = Zod.object("ReadProductsResponse", {
  ok: z.boolean(),
  result: z.object({
    products: z.array(Product),
    categoryPath: z.array(Category),
  }),
  count: z.object({
    products: z.number(),
  }),
});

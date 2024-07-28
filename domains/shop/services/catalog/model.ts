import { z, Zod } from "./helper.ts";

// ENDPOINT MESSAGES.

export type EchoRequest = z.infer<typeof EchoRequest>;
export const EchoRequest = Zod.schema(
  "EchoRequest",
  z.lazy(() => Echo),
);

export type EchoResponse = z.infer<typeof EchoResponse>;
export const EchoResponse = Zod.schema(
  "EchoResponse",
  z.object({
    ok: z.boolean(),
    result: z.lazy(() => Echo),
  }),
);

export type WriteProductRequest = z.infer<typeof WriteProductRequest>;
export const WriteProductRequest = Zod.object("WriteProductRequest", {
  product: z.lazy(() => Product),
});

export type WriteProductResponse = z.infer<typeof WriteProductResponse>;
export const WriteProductResponse = Zod.object("WriteProductResponse", {
  ok: z.boolean(),
});

export type ReadProductsRequest = z.infer<typeof ReadProductsRequest>;
export const ReadProductsRequest = Zod.object("ReadProductsRequest", {
  category: z.string().nullable().optional(),
  attributes: z.array(z.string()).optional(),
});

export type ReadProductsResponse = z.infer<typeof ReadProductsResponse>;
export const ReadProductsResponse = Zod.object("ReadProductsResponse", {
  ok: z.boolean(),
  result: z.object({
    products: z.array(z.lazy(() => Product)),
  }),
  count: z.object({
    products: z.number(),
  }),
});

// MESSAGES.

export type Echo = z.infer<typeof Echo>;
export const Echo = Zod.object("Echo", {
  message: z.string(),
});

export type Product = z.infer<typeof Product>;
export const Product = Zod.object("Product", {
  productNumber: z.string(),
  productTitle: z.string(),
  categoryPath: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
    }),
  ),
  attributeList: z.array(
    z.object({
      id: z.string(),
      attribute: z.string(),
    }),
  ),
  createdDate: z.string().optional(),
  lastModifiedDate: z.string().optional(),
});

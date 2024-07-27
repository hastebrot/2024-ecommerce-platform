import { z, Zod } from "./helper.ts";

export type ServiceContext = {
  kv: Deno.Kv;
};

export type ClientContext = {
  kv: Deno.Kv;
  workspace: string;
};

// ENDPOINT MESSAGES.

export const EchoRequest = Zod.schema(
  "EchoRequest",
  z.lazy(() => Echo)
);

export const EchoResponse = Zod.schema(
  "EchoResponse",
  z.object({
    ok: z.boolean(),
    result: z.lazy(() => Echo),
  })
);

export const WriteProductRequest = Zod.object("WriteProductRequest", {
  product: z.lazy(() => Product),
});

export const WriteProductResponse = Zod.object("WriteProductResponse", {
  ok: z.boolean(),
});

export const ReadProductsRequest = Zod.object("ReadProductsRequest", {
  category: z.string().nullable().optional(),
  attributes: z.array(z.string()).optional(),
});

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
export const Echo = z.object({
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
    })
  ),
  attributeList: z.array(
    z.object({
      id: z.string(),
      attribute: z.string(),
    })
  ),
  createdDate: z.string().optional(),
  lastModifiedDate: z.string().optional(),
});

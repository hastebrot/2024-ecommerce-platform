import { z, Zod } from "./helper.ts";

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

// MESSAGES.

export type Echo = z.infer<typeof Echo>;
export const Echo = z.object({
  message: z.string(),
});

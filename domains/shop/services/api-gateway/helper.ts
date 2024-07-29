import { format as formatBytes } from "@std/fmt/bytes.ts";
import { format as formatMillis } from "@std/fmt/duration.ts";
import { nanoid } from "nanoid";
import { z } from "zod";

export { z };

export const throwError = (message: string): never => {
  throw new Error(message);
};

export const Env = {
  stringOrThrow(key: string): string {
    const value = Deno.env.get(key);
    if (value === undefined) {
      throw new Error(`env lookup failed, key='${key}'`);
    }
    return value;
  },

  integerOrThrow(key: string): number {
    const value = Deno.env.get(key);
    if (value === undefined) {
      throw new Error(`env lookup failed, key='${key}'`);
    }
    if (Number.isInteger(Number(value))) {
      return Number(value);
    }
    throw new Error(`env parse of integer failed, key='${key}'`);
  },
};

export const Log = {
  // deno-lint-ignore no-explicit-any
  debug(...data: any[]) {
    console.debug(...data);
  },

  // deno-lint-ignore no-explicit-any
  error(...data: any[]) {
    console.error(...data);
  },
};

export const Json = {
  // deno-lint-ignore no-explicit-any
  write(text: any, space: number = 2): string {
    return JSON.stringify(text, null, space);
  },

  read(text: string): string {
    return JSON.parse(text);
  },
};

export const Fmt = {
  bytes(bytes: number): string {
    return formatBytes(bytes);
  },

  millis(millis: number, roundTo: "millis" | "micros" | "nanos" = "micros"): string {
    if (roundTo === "millis") {
      millis = Math.round(millis);
    } else if (roundTo === "micros") {
      millis = Math.round(millis * 1e3) / 1e3;
    }
    return millis === 0 ? "0ms" : formatMillis(millis, { ignoreZero: true });
  },
};

export const Id = {
  nanoid(size?: number): string {
    return nanoid(size);
  },
};

export const Zod = {
  parseTyped<Out, In>(schema: z.ZodType<Out, z.ZodTypeDef, In>, value: In): Out {
    try {
      return schema.parse(value);
    } catch (error: unknown) {
      let cause = error;
      if (error instanceof z.ZodError) {
        cause = error.message;
      }
      const message = `Zod parse error, schema '${schema.description}'`;
      throw new Error(`${message}, ${cause}`);
    }
  },

  parse<Out, In>(schema: z.ZodType<Out, z.ZodTypeDef, In>, value: unknown): Out {
    return Zod.parseTyped(schema, value);
  },

  schema<T extends z.ZodType>(description: string, schema: T): T {
    return schema.describe(description);
  },

  object<T extends z.ZodRawShape>(description: string, shape: T): ReturnType<typeof z.object<T>> {
    return z.object(shape).describe(description);
  },
};

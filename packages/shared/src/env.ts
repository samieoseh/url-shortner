import { z, type ZodRawShape } from "zod";

export function parseEnv<TSchema extends ZodRawShape>(schema: TSchema) {
  return z.object(schema).parse(process.env);
}

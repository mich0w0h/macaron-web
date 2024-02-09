import { assertEquals } from "https://deno.land/std@0.107.0/testing/asserts.ts";
import { getEnv } from "../src/modules/envConfig.ts";

Deno.test("getEnv should return an object", () => {
  const env = getEnv();
  assertEquals(typeof env, "object");
});

Deno.test("getEnv should return an object with environment variables", () => {
  const env = getEnv();
  assertEquals(typeof env.OPENAI_API_KEY, "string");
});

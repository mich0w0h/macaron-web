import { config, DotenvConfig } from "https://deno.land/x/dotenv/mod.ts";

export function getEnv(): DotenvConfig {
  const env = config({ path: "./.env" });

  return env;
}

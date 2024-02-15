// Code to create a server using Oak framework with deno and handle requests from the frontend
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { RateLimiter } from "https://deno.land/x/oak_rate_limit/mod.ts";
import { generateLLMResponse } from "./modules/langchainHandler.ts";
import { CharacterResponse, UserComment } from "../../types/index.d.ts";

const app = new Application();

// Set up rate limiting middleware
const rateLimit = RateLimiter({
  windowMs: 1000,
  max: 100,
});

// make sure to initialize middlewares before the router
app.use(await rateLimit);

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  // receive a user comment and return a response
  .post("/generate", async (context) => {
    try {
      const body = await context.request.body.text();
      const userComment: UserComment = JSON.parse(body);

      const responseText: string = await generateLLMResponse(userComment.text);

      const characterResponse: CharacterResponse = {
        text: responseText,
      };

      context.response.body = JSON.stringify(characterResponse);
      context.response.type = "json";
      context.response.status = 200;

      console.log("[deno router] response sent to frontend");
    } catch (error) {
      console.error("[deno router] error occurred:", error);

      context.response.body = {
        error: "An error occurred while processing the request.",
      };
      context.response.status = 500;
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on http://localhost:8000`);
await app.listen({ port: 8000 });

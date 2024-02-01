import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello World!";
  })
  .post("/user-input", async (context) => {
    const body = await context.request.body;
    const userInput = body.text;
    context.response.body = `Received user input: ${userInput}`;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on http://localhost:8000`);
await app.listen({ port: 8000 });

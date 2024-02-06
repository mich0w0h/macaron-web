// Code to create a server using Oak framework with deno and handle requests from the frontend
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { CharacterResponse, UserComment } from "../types/index.d.ts";

const app = new Application();

// Enable CORS for port 5173 on localhost using oakCors
// make sure initializing oakCors before the router
app.use(
  oakCors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    methods: "POST, OPTIONS",
  }),
);

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  // receive a user comment and return a response
  .post("/api/generate", async (context) => {
    const body = await context.request.body.text();
    const userComment: UserComment = JSON.parse(body);
    console.log("user comment: ", userComment.text);

    // call the model to generate a response
    console.log("Generating response...");
    const characterResponse: CharacterResponse = {
      text: "This is a CharacterResponse from the model",
    };

    context.response.body = JSON.stringify(characterResponse);
    context.response.type = "json";
    context.response.status = 200;
    // When this route handler finishes executing, the Oak framework automatically sends the response back to the client.
    console.log("Response generated and sent to frontend");
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on http://localhost:8000`);
await app.listen({ port: 8000 });

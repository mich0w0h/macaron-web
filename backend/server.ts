// Code to create a server using Oak framework with deno and handle requests from the frontend
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  // receive a user comment and return a response
  .post("/api/generate", async (context) => {
    const body = await context.request.body;
    const value = await body.text();
    const comment: string = value.comment;
    console.log("user comment: ", comment);
    
    // call the model to generate a response
    console.log("Generating response...");
    const response = "This is a response from the model";

    context.response.body = { response };
    context.response.type = "json";
    context.response.status = 200;
    
    // When this route handler finishes executing, the Oak framework automatically sends the response back to the client. 
    console.log("Response generated and sent to frontend");
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// Enable CORS for port 5173 on localhost using oakCors
app.use(
  oakCors({
    origin: "http://localhost:5173",
  }),
);

console.log(`Server running on http://localhost:8000`);
await app.listen({ port: 8000 });

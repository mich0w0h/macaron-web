// Code to create a server using Oak framework with deno and handle requests from the frontend
import {
  Application,
  Middleware,
  Router,
} from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { CharacterResponse, UserComment } from "../types/index.d.ts";

const app = new Application();

// Define a whitelist of domains
const whitelist = ["http://localhost:5173", "http://example.com"];

// Middleware to check the Origin header
const checkOrigin: Middleware = async (context, next) => {
  const requestOrigin = context.request.headers.get("Origin");
  if (requestOrigin && !whitelist.includes(requestOrigin)) {
    context.response.status = 403;
    context.response.body = "Origin not allowed";
  } else {
    await next();
  }
};

// Enable CORS for port 5173 on localhost using oakCors middleware
const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  methods: "POST, OPTIONS",
};

// make sure to initialize middlewares before the router
app.use(
  oakCors(corsOptions),
  checkOrigin,
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

import { ChatOpenAI } from "npm:@langchain/openai";
import { PromptTemplate } from "npm:@langchain/core/prompts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: config().OPENAI_API_KEY,
});

// create prompt for the chat
const prompt = PromptTemplate.fromTemplate(
  "tell me a joke about {topic}",
);

const chain = prompt.pipe(model);

const response = await chain.invoke({ "topic": "chicken" });

console.log(response);

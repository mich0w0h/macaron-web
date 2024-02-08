import { ChatOpenAI } from "npm:@langchain/openai";
import { PromptTemplate } from "npm:@langchain/core/prompts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { AIMessage } from "npm:@langchain/core/messages";
import { dirname } from "https://deno.land/std@0.212.0/path/dirname.ts";

// project root directory path
// the project root is the parent directory of where deno server is run
const projectRootPath = dirname(Deno.cwd());

// load environment variables from .env file in project root
const env = config({ path: projectRootPath + "/.env" });

function createModel() {
  console.log("dir name: ", projectRootPath);
  return new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: env.OPENAI_API_KEY,
  });
}

export async function generateLLMResponse(
  commentText: string,
): Promise<string> {
  const response: AIMessage = await invokeLangChain(commentText);
  const responseText = response.content.toString();

  return responseText;
}

async function invokeLangChain(commentText: string): Promise<AIMessage> {
  const model = createModel();

  const prompt = PromptTemplate.fromTemplate(
    "{commentText}",
  );

  console.log("[LangChain] input prompt: ", prompt);

  const chain = prompt.pipe(model);
  const response: AIMessage = await chain.invoke({
    "commentText": commentText,
  });

  console.log("[LangChain] response generated: ", response);

  return response;
}

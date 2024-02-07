import { ChatOpenAI } from "npm:@langchain/openai";
import { PromptTemplate } from "npm:@langchain/core/prompts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { AIMessage } from "npm:@langchain/core/messages";

function createModel() {
  return new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: config().OPENAI_API_KEY,
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

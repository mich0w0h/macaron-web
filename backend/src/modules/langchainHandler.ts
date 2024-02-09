import { ChatOpenAI } from "npm:@langchain/openai";
import {
  FewShotPromptTemplate,
  PromptTemplate,
} from "npm:@langchain/core/prompts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { AIMessage } from "npm:@langchain/core/messages";
import { dirname } from "https://deno.land/std@0.212.0/path/dirname.ts";

// project root directory path
// the project root is the parent directory of where deno server is run
const projectRootPath = dirname(Deno.cwd());

// load environment variables from .env file in project root
const env = config({ path: projectRootPath + "/.env" });

function createModel() {
  return new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: env.OPENAI_API_KEY,
  });
}

function createPrompt(characterLines: string[]) {
  const examples = characterLines.map((line) => {
    return { "answer": line }; // answer is the label for the example
  });

  const prompt = new PromptTemplate({
    template: "マカロン： {answer}",
    inputVariables: ["answer"],
  });

  const prefix =
    "以下の回答例を参考にして、ユーザーの入力に対してのマカロンの返答を作成してください";
  const suffix = `
    ユーザー： {commentText}
    マカロン：`;

  const fewShotPrompt = new FewShotPromptTemplate({
    examples: examples,
    examplePrompt: prompt,
    prefix: prefix,
    suffix: suffix,
    inputVariables: ["commentText"],
  });

  return fewShotPrompt;
}

async function invokeLangChain(commentText: string): Promise<AIMessage> {
  const model = createModel();

  const characterLines = [
    "マカロンだよ！",
    "おはおはよ！",
  ];
  const promptTemplate = createPrompt(characterLines);
  console.log("[LangChain] prompt template created: ", promptTemplate);

  const formattedPrompt = await promptTemplate.format({
    commentText: commentText,
  });

  const result: AIMessage = await model.invoke(formattedPrompt);

  console.log("[LangChain] response generated: ", result);

  return result;
}

export async function generateLLMResponse(
  commentText: string,
): Promise<string> {
  const response: AIMessage = await invokeLangChain(commentText);
  const responseText = response.content.toString();

  return responseText;
}

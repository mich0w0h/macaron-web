import { ChatOpenAI } from "npm:@langchain/openai";
import {
  FewShotPromptTemplate,
  PromptTemplate,
} from "npm:@langchain/core/prompts";
import { AIMessage } from "npm:@langchain/core/messages";
import { getEnv } from "./envConfig.ts";
import { csvToFlatArray } from "./csvParser.ts";

function createModel() {
  const env = getEnv();

  return new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: env.OPENAI_API_KEY,
    maxTokens: 20,
  });
}

function createPromptFromLines(characterLines: string[]) {
  const examples = characterLines.map((line) => {
    return { "answer": line }; // answer is the label for the example
  });

  const example_prompt = new PromptTemplate({
    template: "{answer}",
    inputVariables: ["answer"],
  });

  const prefix =
    "以下の回答例を参考にして、ユーザーの入力に対してのマカロンの返答を作成してください";
  const suffix = `
    ユーザー： {commentText}
    マカロン：`;

  const fewShotPrompt = new FewShotPromptTemplate({
    examples: examples,
    examplePrompt: example_prompt,
    prefix: prefix,
    suffix: suffix,
    inputVariables: ["commentText"],
  });

  return fewShotPrompt;
}

async function invokeLangChain(commentText: string): Promise<AIMessage> {
  const model = createModel();

  const characterLines = await csvToFlatArray("./data/line_examples.csv");
  const promptTemplate = createPromptFromLines(characterLines);

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

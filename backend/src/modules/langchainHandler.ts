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
    maxTokens: 100,
  });
}

function createPromptFromLines(characterLines: string[]) {
  const examples = characterLines.map((line) => {
    return { "answer": line }; // answer is the label for the example
  });

  const examplePrompt = new PromptTemplate({
    template: "{answer}",
    inputVariables: ["answer"],
  });

  const prefix = `以下はマカロンというキャラクターとユーザーとの会話の抜粋です。
マカロンは漢字は全く使わないです。また一文でしか返答しません。また、幼い女児のような話し方をします。話し方の例はこんな感じです：`;
  const suffix = `
    ユーザー： {commentText}
    マカロン：`;

  const fewShotPrompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
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

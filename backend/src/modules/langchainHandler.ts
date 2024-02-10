import { ChatOpenAI } from "npm:@langchain/openai";
import {
  FewShotPromptTemplate,
  PromptTemplate,
} from "npm:@langchain/core/prompts";
import { StringOutputParser } from "npm:@langchain/core/output_parsers";
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

async function invokeLangChain(commentText: string): Promise<string> {
  const model = createModel();
  const outputParser = new StringOutputParser();

  const characterLines = await csvToFlatArray("./data/line_examples.csv");
  const promptTemplate = createPromptFromLines(characterLines);

  console.log("[LangChain] prompt template created: ", promptTemplate);

  const chain = promptTemplate.pipe(model).pipe(outputParser);

  const stringResult = await chain.invoke({
    commentText: commentText,
  }) as string;

  console.log("[LangChain] response generated: ", stringResult);

  return stringResult;
}

export async function generateLLMResponse(
  commentText: string,
): Promise<string> {
  const stringResult: string = await invokeLangChain(commentText);

  return stringResult;
}

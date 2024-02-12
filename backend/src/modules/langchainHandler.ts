import { ChatOpenAI } from "npm:@langchain/openai";
import { RunInput } from "npm:@langchain/core";
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

function createPromptFromLines(
  characterLines: string[],
): FewShotPromptTemplate {
  const examples = characterLines.map((line) => {
    return { "answer": line }; // answer is the label for the example
  });

  const examplePrompt = new PromptTemplate({
    template: "{answer}",
    inputVariables: ["answer"],
  });

  const prefix =
    `ユーザーの入力に対し、マカロンというキャラクターの返答を生成してください。
マカロンは幼い女の子みたいに話す、世間知らずなキャラクターです。
また、マカロンの返答は一言で作成してください。`;
  const suffix = `
ユーザー： {commentText}
マカロン：
`;

  const fewShotPrompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: prefix,
    suffix: suffix,
    inputVariables: ["commentText"],
  });

  return fewShotPrompt;
}

async function invokeFewShot(
  promptTemplate: FewShotPromptTemplate,
  chainInput: RunInput,
): Promise<string> {
  const model = createModel();
  const outputParser = new StringOutputParser();

  console.log("[LangChain] prompt template created: ", promptTemplate);

  const chain = promptTemplate.pipe(model).pipe(outputParser);

  const stringResult = await chain.invoke(chainInput) as string;

  console.log("[LangChain] response generated: ", stringResult);

  return stringResult;
}

export async function generateLLMResponse(
  commentText: string,
): Promise<string> {
  const characterLines = await csvToFlatArray("./data/line_examples.csv");
  const promptTemplate = createPromptFromLines(characterLines);

  const stringResult: string = await invokeFewShot(promptTemplate, {
    commentText: commentText,
  });

  return stringResult;
}

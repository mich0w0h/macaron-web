import { ChatOpenAI } from "npm:@langchain/openai";
import { RunInput } from "npm:@langchain/core";
import {
  FewShotPromptTemplate,
  PromptTemplate,
} from "npm:@langchain/core/prompts";
import { StringOutputParser } from "npm:@langchain/core/output_parsers";
import { getEnv } from "./envConfig.ts";
import { csvToFlatArray } from "./csvParser.ts";
import { containsKanji } from "./characterChecker.ts";

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

function createPromptToConvertKanji(): FewShotPromptTemplate {
  const examples = [
    { "input": "私は猫が好きです。", "output": "わたしはねこがすきです。" },
    {
      "input": "私はお金が欲しいです。",
      "output": "わたしはおかねがほしいです。",
    },
  ];

  const examplePrompt = new PromptTemplate({
    template: "入力：{input}\n出力：{output}",
    inputVariables: ["input", "output"],
  });

  const fewShotPrompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: "次の文章の漢字をひらがなに変換してください。",
    suffix: "入力：{input_string}\n出力：",
    inputVariables: ["input_string"],
  });

  return fewShotPrompt;
}

async function invokeFewShot(
  promptTemplate: FewShotPromptTemplate,
  chainInput: RunInput,
): Promise<string> {
  const model = createModel();
  const outputParser = new StringOutputParser();

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

  let stringResult: string = await invokeFewShot(promptTemplate, {
    commentText: commentText,
  });

  if (containsKanji(stringResult)) {
    const kanjiConversionPrompt = createPromptToConvertKanji();
    stringResult = await invokeFewShot(kanjiConversionPrompt, {
      input_string: stringResult,
    });
  }

  return stringResult;
}

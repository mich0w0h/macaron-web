import { generateLLMResponse } from "./langchainHandler.ts";
import { CharacterResponse, UserComment } from "../../../types/index.d.ts";

export async function generateResponse(
  userComment: UserComment,
): Promise<CharacterResponse> {
  console.log("user comment: ", userComment.text);

  // invoke the LangChain to generate a response
  const responseText: string = await generateLLMResponse(userComment.text);

  const characterResponse: CharacterResponse = {
    text: responseText,
  };

  return characterResponse;
}

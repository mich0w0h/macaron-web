import { CharacterResponse, UserComment } from "../types/index.d.ts";

export function generateResponse(userComment: UserComment): CharacterResponse {
  console.log("user comment: ", userComment.text);

  // call the model to generate a response
  console.log("Generating response...");
  const characterResponse: CharacterResponse = {
    text: "This is a CharacterResponse from the model",
  };

  console.log("Response generated!", characterResponse.text);
  return characterResponse;
}

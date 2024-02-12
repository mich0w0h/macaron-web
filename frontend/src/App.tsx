import React, { useState } from "react";
import CharacterDisplay from "./components/CharacterDisplay";
import CommentInput from "./components/CommentInput";
import CommentList from "./components/CommentList";
import SpeechBalloon from "./components/SpeechBalloon";
import { type CharacterResponse, type UserComment } from "../../types";
import "./App.css";

const App: React.FC = () => {
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [characterResponse, setCharacterResponse] = useState<CharacterResponse>(
    { text: "" },
  );

  const [showSpeechBalloon, setShowSpeechBalloon] = useState(false);
  const maxCommentsToShow = 3;

  // Async function to handle the API call
  const submitUserCommentToApi = async (
    userComment: UserComment, // Use UserComment as the type for userComment
  ): Promise<CharacterResponse> => {
    let characterResponse: CharacterResponse = { text: "" };

    try {
      const response: Response = await fetch(
        "http://localhost:8000/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userComment), // Pass userComment directly to JSON.stringify
        },
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${response.statusText}`,
        );
      }

      characterResponse = await response.json();
      return characterResponse;
    } catch (error) {
      console.error("Error:", error);
      characterResponse.text = "マカロン、よくわからなかった！";
      return characterResponse;
    }
  };

  // Event handler function
  const handleUserCommentSubmit = (userComment: UserComment): void => {
    const updatedComments: UserComment[] = [...userComments, userComment];
    setUserComments(updatedComments.slice(-maxCommentsToShow));

    submitUserCommentToApi(userComment)
      .then((characterResponse) => {
        setShowSpeechBalloon(true);
        setCharacterResponse(characterResponse);
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  const handleSpeechBalloonHide = (): void => {
    setShowSpeechBalloon(false);
  };

  return (
    <div className="container">
      <SpeechBalloon
        message={characterResponse.text}
        isVisible={showSpeechBalloon}
        onHide={handleSpeechBalloonHide}
      />
      <CharacterDisplay />
      <div className="comment-section">
        <CommentList comments={userComments} maxComments={maxCommentsToShow} />
        <CommentInput onCommentSubmit={handleUserCommentSubmit} />
      </div>
    </div>
  );
};

export default App;

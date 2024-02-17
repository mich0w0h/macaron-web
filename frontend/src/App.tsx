import React, { useState } from "react";
import CharacterDisplay from "./components/CharacterDisplay";
import CommentInput from "./components/CommentInput";
import CommentList from "./components/CommentList";
import SpeechBalloon from "./components/SpeechBalloon";
import { type CharacterResponse, type UserComment } from "../../types";
import useSpeechBalloon from "./hooks/useSpeechBalloonVisibility";
import callApi from "./api";
import "./App.css";

const App: React.FC = () => {
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [characterResponse, setCharacterResponse] = useState<CharacterResponse>(
    { text: "" },
  );
  const maxCommentsToShow = 3;

  const { isVisible, showBalloon, hideBalloon } = useSpeechBalloon();

  // Event handler function
  const handleUserCommentSubmit = (userComment: UserComment): void => {
    const updatedComments: UserComment[] = [...userComments, userComment];
    setUserComments(updatedComments.slice(-maxCommentsToShow));

    callApi("/api/generate", "POST", userComment)
      .then((response) => {
        setCharacterResponse(response.data as CharacterResponse);
      })
      .catch((error: Error) => {
        console.error("Error occurred while calling the API:", error);
        setCharacterResponse({ text: "マカロン、よくわからなかった！" });
      })
      .finally(() => {
        showBalloon();
      });
  };

  return (
    <div className="container">
      <div className="character-section">
        <SpeechBalloon
          message={characterResponse.text}
          isVisible={isVisible}
          onHide={hideBalloon}
        />
        <CharacterDisplay />
      </div>
      <div className="comment-section">
        <CommentList comments={userComments} maxComments={maxCommentsToShow} />
        <CommentInput onCommentSubmit={handleUserCommentSubmit} />
      </div>
    </div>
  );
};

export default App;

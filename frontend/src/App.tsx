import React, { useState } from "react";
import CharacterDisplay from "./components/CharacterDisplay";
import CommentInput from "./components/CommentInput";
import CommentList from "./components/CommentList";
import SpeechBalloon from "./components/SpeechBalloon";
import { type CharacterResponse, type UserComment } from "../../types";
import useApi from "./hooks/useApi";
import "./App.css";

const App: React.FC = () => {
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [showSpeechBalloon, setShowSpeechBalloon] = useState(false);
  const maxCommentsToShow = 3;

  // custom hook
  const { data: characterResponse, callApi } = useApi<CharacterResponse>();

  // Event handler function
  const handleUserCommentSubmit = (userComment: UserComment): void => {
    const updatedComments: UserComment[] = [...userComments, userComment];
    setUserComments(updatedComments.slice(-maxCommentsToShow));

    callApi("/api/generate", "POST", userComment)
      .then(() => {
        setShowSpeechBalloon(true);
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
      <div className="character-section">
        <SpeechBalloon
          message={characterResponse?.text ?? ""}
          isVisible={showSpeechBalloon}
          onHide={handleSpeechBalloonHide}
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

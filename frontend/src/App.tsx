import React, { useState } from "react";
import CharacterDisplay from "./components/CharacterDisplay";
import CommentInput from "./components/CommentInput";
import CommentList from "./components/CommentList";
import SpeechBalloon from "./components/SpeechBalloon";
import "./App.css";

const App: React.FC = () => {
  const [userComments, setUserComments] = useState<string[]>([]);
  const [characterResponse, setCharacterResponse] = useState<string>("");

  const [showSpeechBalloon, setShowSpeechBalloon] = useState(false);
  const maxCommentsToShow = 4;

  // Async function to handle the API call
  const submitUserCommentToApi = async (
    userComment: string,
  ): Promise<string> => {
    const response: Response = await fetch(
      "http://localhost:8000/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userComment }),
      },
    );

    const data = await response.json();
    return data.response;
  };

  // Event handler function
  const handleUserCommentSubmit = (userComment: string): void => {
    const updatedComments: string[] = [...userComments, userComment];
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
        message={characterResponse}
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

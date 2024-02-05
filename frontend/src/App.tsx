import React, { useState } from "react";
import CharacterDisplay from "./components/CharacterDisplay";
import CommentInput from "./components/CommentInput";
import CommentList from "./components/CommentList";
import SpeechBalloon from "./components/SpeechBalloon";
import "./App.css";

const App: React.FC = () => {
  const [comments, setComments] = useState<string[]>([]);

  const [showSpeechBalloon, setShowSpeechBalloon] = useState(false);
  const maxCommentsToShow = 4;

  // Async function to handle the API call
  const submitCommentToApi = async (comment: string): Promise<void> => {
    const response: Response = await fetch(
      "http://localhost:8000/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      },
    );

    const data = await response.json();
    console.log("Generated response: ", data);
  };

  // Event handler function
  const handleCommentSubmit = (comment: string): void => {
    const updatedComments: string[] = [...comments, comment];
    setComments(updatedComments.slice(-maxCommentsToShow));

    submitCommentToApi(comment)
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
      <SpeechBalloon
        message="マカロンはねむくなってきた"
        isVisible={showSpeechBalloon}
        onHide={handleSpeechBalloonHide}
      />
      <CharacterDisplay />
      <div className="comment-section">
        <CommentList comments={comments} maxComments={maxCommentsToShow} />
        <CommentInput onCommentSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default App;

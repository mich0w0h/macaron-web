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

  const handleCommentSubmit = async (comment: string): Promise<string> => {
    const updatedComments: string[] = [...comments, comment];
    setComments(updatedComments.slice(-maxCommentsToShow));
    let result: string = "";

    try {
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
      result = data.response;
      console.log("result: ", result);
    } catch (error: any) {
      console.error("Error:", error);
    }

    setShowSpeechBalloon(true);
    return result;
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

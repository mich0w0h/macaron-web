// App.tsx
import React, { useState } from 'react';
import CharacterDisplay from './components/CharacterDisplay';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import SpeechBalloon from './components/SpeechBalloon';
import './App.css';

const App: React.FC = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [showSpeechBalloon, setShowSpeechBalloon] = useState(false);
  const maxCommentsToShow = 4;

  const handleCommentSubmit = (comment: string) => {
    const updatedComments = [...comments, comment];
    setComments(updatedComments.slice(-maxCommentsToShow));
    setShowSpeechBalloon(true);
  };

  const handleSpeechBalloonHide = () => {
    setShowSpeechBalloon(false);
  };

  return (
    <div className="container">
      <SpeechBalloon message="マカロンはねむくなってきた" isVisible={showSpeechBalloon} onHide={handleSpeechBalloonHide} />
      <CharacterDisplay />
      <div className="comment-section">
        <CommentList comments={comments} maxComments={maxCommentsToShow} />
        <CommentInput onCommentSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default App;

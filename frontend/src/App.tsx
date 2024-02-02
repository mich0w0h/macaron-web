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

    // send the comment to the server and receive a response
    fetch('http://localhost:8000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("response: ", response);
      return response;
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
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

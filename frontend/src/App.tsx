import React, { useState } from 'react';
import CharacterDisplay from './components/CharacterDisplay';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import './App.css';

const App: React.FC = () => {
  const [comments, setComments] = useState<string[]>([]);
  const maxCommentsToShow = 4;

  const handleCommentSubmit = (comment: string) => {
    const updatedComments = [...comments, comment];
    setComments(updatedComments.slice(-maxCommentsToShow)); // Retain only the latest 'maxCommentsToShow'
  };

  return (
    <div className="container">
      <CharacterDisplay />
      <div className="comment-section">
        <CommentList comments={comments} maxComments={maxCommentsToShow} />
        <CommentInput onCommentSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default App;

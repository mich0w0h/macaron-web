import React, { useState } from 'react';
import CharacterDisplay from './components/CharacterDisplay';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import './App.css';

const App: React.FC = () => {
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = (comment: string) => {
    setComments([...comments, comment]);
  };

  return (
    <div className='center-container'>
      <div className="container">
        <CharacterDisplay />
        <div className="comment-section">
          <CommentList comments={comments} />
          <CommentInput onCommentSubmit={handleCommentSubmit} />
        </div>
      </div>
    </div>
    
  );
};

export default App;

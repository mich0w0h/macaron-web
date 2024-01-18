import React, { useState } from 'react';
import './CommentInput.css';

interface CommentInputProps {
  onCommentSubmit: (comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      onCommentSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="comment-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your comment..."
          value={comment}
          onChange={handleChange}
        />
        <button type="submit">
          &lt;
        </button>
      </form>
    </div>
  );
};

export default CommentInput;

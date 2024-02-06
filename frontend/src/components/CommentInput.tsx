import React, { useState } from "react";
import "./CommentInput.css";
import { type UserComment } from "../../../types";

interface CommentInputProps {
  onCommentSubmit: (comment: UserComment) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState<UserComment>({ text: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newComment: UserComment = {
      text: event.target.value,
    };
    setComment(newComment);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (comment.text.trim() !== "") {
      onCommentSubmit(comment);
      setComment({ text: "" });
    }
  };

  return (
    <div className="comment-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your comment..."
          value={comment.text}
          onChange={handleChange}
        />
        <button type="submit">&lt;</button>
      </form>
    </div>
  );
};

export default CommentInput;

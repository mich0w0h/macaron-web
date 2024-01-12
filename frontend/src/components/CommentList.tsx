import React from 'react';
import "./CommentList.css";

interface CommentListProps {
  comments: string[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <div key={index} className="comment-item">
          {comment}
        </div>
      ))}
    </div>
  );
};

export default CommentList;

import React from "react";
import "./CommentList.css";
import { type UserComment } from "../../../types";

interface CommentListProps {
  comments: UserComment[];
  maxComments: number;
}

const CommentList: React.FC<CommentListProps> = ({ comments, maxComments }) => {
  const visibleComments = comments.slice(-maxComments);

  return (
    <div className="comment-list">
      {visibleComments.map((comment, index) => (
        <div
          key={index}
          className={`comment-item ${
            index < comments.length - maxComments ? "hidden" : ""
          }`}
        >
          {comment.text}
        </div>
      ))}
    </div>
  );
};

export default CommentList;

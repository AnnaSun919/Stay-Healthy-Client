import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";

function Comment(props) {
  console.log(props);

  const { onCreateComment, activityDetail } = props;
  const [comments, updateComment] = useState(null);

  useEffect(() => {
    try {
      if (activityDetail.comments.length) {
        updateComment(activityDetail.comments);
      }
    } catch (err) {
      console.log("Activity fetch failed", err);
    }
  }, []);

  if (!comments) {
    return <CreateComment onCreateComment={onCreateComment} />;
  }

  return (
    <div>
      Comment
      {comments.map((elem) => (
        <>
          <p>
            {elem.comment} by {elem.creater.username}
          </p>
        </>
      ))}
      <CreateComment onCreateComment={onCreateComment} />
    </div>
  );
}

export default Comment;

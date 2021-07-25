import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import { Avatar } from "@material-ui/core";

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
            <Avatar src={elem.creater.image} alt="User" /> : {elem.comment}
          </p>
        </>
      ))}
      <CreateComment onCreateComment={onCreateComment} />
    </div>
  );
}

export default Comment;

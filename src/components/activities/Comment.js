import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import { Avatar, Card, CardHeader } from "@material-ui/core";
import { API_URL } from "../../config";
import axios from "axios";

function Comment(props) {
  console.log(props);

  const [commentsdetails, updateActiviy] = useState(null);
  const { onCreateComment, activityDetail, comments } = props;

  // console.log(activityDetail);

  useEffect(() => {
    try {
      async function getData() {
        let response = await axios.get(`${API_URL}/api/comments`);
        updateActiviy(response.data);
      }

      getData();
    } catch (err) {
      console.log("comment fetch failed", err);
    }
  }, []);

  // console.log(commentsdetails.comment);

  console.log(comments);

  if (!comments) {
    return <CreateComment onCreateComment={onCreateComment} />;
  }
  return (
    <div>
      Comment
      {comments.map((elem) => (
        <>
          <p>
            {elem.activity === activityDetail._id ? (
              <CardHeader
                avatar={<Avatar src={elem.createrimg} alt="User" />}
                title={elem.comment}
              />
            ) : (
              ""
            )}
          </p>
        </>
      ))}
      <CreateComment onCreateComment={onCreateComment} />
    </div>
  );
}

export default Comment;

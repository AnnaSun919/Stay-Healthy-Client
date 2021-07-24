import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import { API_URL } from "../../config";
import axios from "axios";

function Comment(props) {
  const [comment, updateComment] = useState(null);

  const { onCreateComment } = props;

  // useEffect(() => {
  //   try {
  //     async function getData() {
  //       let response = await axios.get(`${API_URL}/api/comments/`);
  //       updateComment(response.data);
  //       console.log(response.data);
  //     }

  //     getData();
  //   } catch (err) {
  //     console.log("comment fetch failed", err);
  //   }
  // }, []);

  // if (!comment) {
  //   return <p>Loading</p>;
  // }

  return (
    <div>
      comment
      <CreateComment onCreateComment={onCreateComment} />
    </div>
  );
}

export default Comment;

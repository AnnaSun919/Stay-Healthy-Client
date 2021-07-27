import React from "react";
import { Button } from "@material-ui/core";
function CreateComment(props) {
  const { onCreateComment, user } = props;

  console.log(user);

  return (
    <div>
      {props.user ? (
        <form onSubmit={onCreateComment}>
          <input name="comment" type="text" placeholder="Comment....." />
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreateComment;

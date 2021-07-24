import React from "react";
import { Button } from "@material-ui/core";
function CreateComment(props) {
  const { onCreateComment } = props;

  return (
    <div>
      <form onSubmit={onCreateComment}>
        <input name="comment" type="text" placeholder="Comment....." />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateComment;

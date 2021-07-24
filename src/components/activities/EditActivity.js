import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import axios from "axios";

function EditActivity(props) {
  const { onEdit } = props;
  const [activitydetails, updateactivity] = useState(null);

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `${API_URL}/api/activity/${props.match.params.id}/edit`
      );

      updateactivity(response.data);
    }

    getData();
  }, []);

  return (
    <div>
      EDIT
      {activitydetails ? (
        <form
          onSubmit={(event) => {
            onEdit(event, activitydetails);
          }}

          // method="POST"
          // action="/upload"
          // encType="multipart/form-data"
          // className={classes.container}
          // noValidate
        >
          {/* <input type="file" name="myImage" accept="image/png, image/jpg" /> */}
          <input name="name" type="text" placeholder={activitydetails.name} />
          {/* <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue={moment().format("yyyy-MM-DD")}
          name="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="time"
          label="Time"
          type="time"
          defaultValue="07:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        /> */}
          <input
            name="location"
            type="text"
            placeholder={activitydetails.location}
          />
          <input
            name="category"
            type="text"
            placeholder={activitydetails.category}
          />
          <input
            name="description"
            type="text"
            placeholder={activitydetails.description}
          />

          {/* <TextField
          className={classes.textField2}
          name="description"
          id="outlined-basic"
          label="Description"
          variant="outlined"
        /> */}

          <Button type="submit" variant="contained" color="secondary">
            Secondary
          </Button>

          {/* {props.error ? <p>{props.error}</p> : ""} */}
        </form>
      ) : (
        <p>loading......</p>
      )}
    </div>
  );
}

export default EditActivity;

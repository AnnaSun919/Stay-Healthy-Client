import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    height: 500,
  },
}));

function CreateActivity(props) {
  const [date, updateDate] = useState("");
  console.log(props);
  console.log(date);

  const classes = useStyles();
  const { onCreateActivity } = props;

  return (
    <form
      onSubmit={onCreateActivity}
      method="POST"
      action="/upload"
      encType="multipart/form-data"
      className={classes.container}
      noValidate
    >
      <input type="file" name="myImage" accept="image/png, image/jpg" />
      <input name="name" type="text" placeholder="Enter name" />
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue="2021-05-24"
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
      />
      <input name="location" type="text" placeholder="Location" />
      <input name="category" type="text" placeholder="category" />

      <TextField
        className={classes.textField2}
        name="description"
        id="outlined-basic"
        label="Description"
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="secondary">
        Secondary
      </Button>

      {/* {props.error ? <p>{props.error}</p> : ""} */}
    </form>
  );
}

export default CreateActivity;

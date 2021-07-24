import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

function EditActivity(props) {
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
  const { onEdit } = props;
  const [activitydetails, updateactivity] = useState(null);
  const classes = useStyles();

  // useEffect(async () => {
  //   try {
  //     let activityId = props.match.params.id;
  //     let response = await axios.get(
  //       `${API_URL}/api/activity/${activityId}/edit`
  //     );
  //     updateactivity(response.data);
  //   } catch (err) {
  //     console.log("Activity fetch failed", err);
  //   }
  // }, []);

  useEffect(() => {
    try {
      async function getData() {
        let activityId = props.match.params.id;
        let response = await axios.get(
          `${API_URL}/api/activity/${activityId}/edit`
        );
        updateactivity(response.data);
      }

      getData();
    } catch (err) {
      console.log("Activity fetch failed", err);
    }
  }, []);

  const handleNameChange = (event) => {
    let newName = event.target.value;
    updateactivity({ ...activitydetails, name: newName });
  };

  const handleDesChange = (event) => {
    let newDes = event.target.value;
    updateactivity({ ...activitydetails, description: newDes });
  };

  const handleLocaChange = (event) => {
    let newLoca = event.target.value;
    updateactivity({ ...activitydetails, location: newLoca });
  };

  const handleCatChange = (event) => {
    let newCat = event.target.value;
    updateactivity({ ...activitydetails, category: newCat });
  };

  const handleDateChange = (event) => {
    let newDate = event.target.value;
    updateactivity({ ...activitydetails, date: newDate });
  };

  const handleTimeChange = (event) => {
    let newTime = event.target.value;
    updateactivity({ ...activitydetails, time: newTime });
  };
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
          <input
            onChange={handleNameChange}
            name="name"
            type="text"
            placeholder={activitydetails.name}
          />

          <TextField
            onChange={handleDateChange}
            id="date"
            label="Date"
            type="date"
            defaultValue={moment.utc(activitydetails.date).format("YYYY-MM-DD")}
            name="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            onChange={handleTimeChange}
            id="time"
            label="Time"
            type="time"
            defaultValue={activitydetails.time}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 600, // 1 min
            }}
          />
          <input
            onChange={handleLocaChange}
            name="location"
            type="text"
            placeholder={activitydetails.location}
          />
          <input
            onChange={handleCatChange}
            name="category"
            type="text"
            placeholder={activitydetails.category}
          />
          {/* <input
          
            name="description"
            type="text"
            placeholder={activitydetails.description}
          /> */}

          <TextField
            onChange={handleDesChange}
            className={classes.textField2}
            name="description"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            placeholder={activitydetails.description}
          />

          <Button type="submit" variant="contained" color="secondary">
            Submit
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

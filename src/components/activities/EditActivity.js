import {
  Button,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

function EditActivity(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "auto",
      margin: 50,
      display: "flex",
      flexDirection: "column",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(3),
      width: 200,
    },
    textField2: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
      height: 100,
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
      {activitydetails ? (
        <Grid container justify="center">
          <Card className={classes.root}>
            <CardHeader title="Edit Activity" />
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
              <CardContent>
                <TextField
                  label="Edit Title"
                  className={classes.textField}
                  onChange={handleNameChange}
                  name="name"
                  type="text"
                  placeholder={activitydetails.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CardContent>
              <CardContent>
                <TextField
                  className={classes.textField}
                  onChange={handleDateChange}
                  id="date"
                  label="Edit Date"
                  type="date"
                  defaultValue={moment
                    .utc(activitydetails.date)
                    .format("YYYY-MM-DD")}
                  name="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CardContent>
              <CardContent>
                <TextField
                  className={classes.textField}
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
              </CardContent>
              <CardContent>
                <TextField
                  className={classes.textField}
                  onChange={handleLocaChange}
                  label="Edit Location"
                  name="location"
                  type="text"
                  placeholder={activitydetails.location}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CardContent>
              <CardContent>
                <TextField
                  label="Change Category"
                  className={classes.textField}
                  onChange={handleCatChange}
                  name="category"
                  type="text"
                  placeholder={activitydetails.category}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CardContent>
              <CardContent>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CardContent>
              <CardContent>
                <Button type="submit" variant="contained" color="secondary">
                  Submit
                </Button>
              </CardContent>

              {/* {props.error ? <p>{props.error}</p> : ""} */}
            </form>
          </Card>
        </Grid>
      ) : (
        <p>loading......</p>
      )}
    </div>
  );
}

export default EditActivity;

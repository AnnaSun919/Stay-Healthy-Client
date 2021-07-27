import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextareaAutosize,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 700,
    width: "auto",
    margin: 50,
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

function CreateActivity(props) {
  const classes = useStyles();

  const { onCreateActivity } = props;

  if (!props.user) {
    return (
      <p>
        Please login <Link to="/signin">login</Link>{" "}
      </p>
    );
  }

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <CardHeader
          // avatar={
          //   <Avatar aria-label="recipe" className={classes.avatar}>
          //     {}
          //   </Avatar>
          // }
          title="Create Activity"
        />
        <CardContent>
          <form
            onSubmit={onCreateActivity}
            // method="POST"
            // action="/upload"
            // // encType="multipart/form-data"
            // className={classes.container}
            // noValidate
          >
            <TextField
              className={classes.textField}
              type="file"
              name="myImage"
              accept="image/png, image/jpg"
            />
            <br />
            <TextField
              className={classes.textField}
              name="name"
              type="text"
              placeholder="Enter title"
            />
            <br />
            <TextField
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
            <br />

            <TextField
              variant="outlined"
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
            <br />
            <TextField
              className={classes.textField}
              variant="outlined"
              name="location"
              type="text"
              placeholder="Location"
            />
            <br />
            <TextField
              className={classes.textField}
              variant="outlined"
              name="category"
              type="text"
              placeholder="Category"
            />
            <br />
            <TextareaAutosize
              className={classes.textField}
              maxRows={4}
              // aria-label="maximum height"
              placeholder="Description"
              // defaultValue="Description"
              name="description"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              style={{ minWidth: 300, height: 300 }}
            />
            {/* <TextField
              name="description"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              style={{ width: 500, height: 500 }}
            /> */}
            <br />
            <Button type="submit" variant="contained" color="secondary">
              Sumbit
            </Button>

            {/* {props.error ? <p>{props.error}</p> : ""} */}
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CreateActivity;

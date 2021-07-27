import { API_URL } from "../../config";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // height: "auto",
    // width: "auto",
    maxWidth: "50%",
    // minWidth: 300,
    margin: 50,
    // justify: "center",
    flexDirection: "column",
    flexGrow: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "50%",
    flex: "1 0 auto",
    // height: "80%",
    // width: "80%",
    padding: 10,
    justify: "center",
  },
  image: {
    marginLeft: 40,
    width: 350,
    height: 400,
  },
  paper: {
    padding: 0,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ActivityDetails(props) {
  const classes = useStyles();

  const [activityDetail, updateActiviy] = useState(null);

  const { onCreateComment, comments } = props;

  // useEffect(async () => {
  //   try {

  //     let id = props.match.params.id;
  //     let response = await axios.get(`${API_URL}/api/activity/${id}`);
  //     updateActiviy(response.data);
  //   } catch (err) {
  //     console.log("Activity fetch failed", err);
  //   }
  // }, []);

  useEffect(() => {
    try {
      async function getData() {
        let activityId = props.match.params.id;
        let response = await axios.get(`${API_URL}/api/activity/${activityId}`);
        updateActiviy(response.data);
      }

      getData();
    } catch (err) {
      console.log("Activity fetch failed", err);
    }
  }, []);

  if (!activityDetail) {
    return <p>Loading</p>;
  }
  console.log(activityDetail.joins);

  return (
    <div>
      <Grid container justify="center">
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <h1> {activityDetail.name}</h1>
          </CardContent>
          {/* <div className={classes.root}> */}
          <Grid container spacing={1}>
            <img className={classes.image} src={activityDetail.image} />
            Host:
            <Avatar src={activityDetail.creater.image} alt="User" />
            Join:
            <>
              {activityDetail.joins.map((elem) => (
                <Avatar src={elem.image} alt="joiner" />
              ))}
            </>
          </Grid>
          {/* </div> */}

          <h6>Description: {activityDetail.description}</h6>

          <CardContent className={classes.content}>
            <Button
              className={classes.btn}
              component={Link}
              to={`/activity/${activityDetail._id}/edit`}
            >
              Edit
            </Button>
            <Button
              className={classes.btn}
              onClick={() => {
                props.onDelete(activityDetail._id);
              }}
            >
              Delete
            </Button>
            <Button
              className={classes.btn}
              onClick={(event) => {
                props.onHandleJoin(event, activityDetail._id);
              }}
            >
              Join
            </Button>
          </CardContent>
          <Comment
            activityDetail={activityDetail}
            comments={comments}
            onCreateComment={(event) => onCreateComment(event, activityDetail)}
          />
        </Card>
      </Grid>
    </div>
  );
}

export default ActivityDetails;

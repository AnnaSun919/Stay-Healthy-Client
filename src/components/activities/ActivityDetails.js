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
  btn: {
    margin: theme.spacing(1),
    height: 20,
    width: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    margain: 0,
    justifyContent: "flex-end",
  },
}));

function ActivityDetails(props) {
  const classes = useStyles();

  const [activityDetail, updateActiviy] = useState(null);

  const { onCreateComment, comments } = props;
  const [creater, updatecreater] = useState(false);
  const [isJoin, updatejoin] = useState(false);

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

  useEffect(() => {
    if (props.user && activityDetail) {
      if (props.user._id === activityDetail.creater._id) {
        updatecreater(true);
      }
    }
  });

  useEffect(() => {
    if (props.user && activityDetail) {
      for (let i = 0; i < activityDetail.joins.length; i++)
        if (activityDetail.joins[i]._id === props.user._id) {
          console.log("yes");
          updatejoin(true);
        }
    }
  });

  console.log(isJoin);

  if (!activityDetail) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Grid container justify="center">
        <Card className={classes.root}>
          <CardContent className={classes.button}>
            <h1> {activityDetail.name}</h1>
            {creater ? (
              <p>
                <Button
                  variant="outlined"
                  className={classes.btn}
                  component={Link}
                  to={`/activity/${activityDetail._id}/edit`}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  className={classes.btn}
                  onClick={() => {
                    props.onDelete(activityDetail._id);
                  }}
                >
                  Delete
                </Button>
              </p>
            ) : (
              <p></p>
            )}

            {!isJoin && props.user ? (
              <p>
                <Button
                  variant="outlined"
                  className={classes.btn}
                  onClick={(event) => {
                    props.onHandleJoin(event, activityDetail._id);
                  }}
                >
                  Join
                </Button>
              </p>
            ) : (
              <p></p>
            )}
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

          <Comment
            user={props.user}
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

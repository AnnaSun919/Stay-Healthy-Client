import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    minWidth: 300,
    margin: 50,
    justify: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",
    margin: 5,
    padding: 0,
  },
  img: {
    width: 300,
    height: 300,
  },
}));

function ActivitiesList(props) {
  const { activities } = props;
  const classes = useStyles();

  console.log(activities);
  return (
    <div>
      <Link to="/activity/create">Create Activity</Link>

      <br />
      {activities.map((activity) => (
        <>
          <Grid container justify="center">
            <Card
              style={{ textDecoration: "none" }}
              component={Link}
              to={`/activity/${activity._id}`}
              className={classes.root}
            >
              <CardContent className={classes.content}>
                <img
                  className={classes.img}
                  src={activity.image}
                  alt="activitypic"
                />
              </CardContent>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {activity.name}
                </Typography>
                <Typography component="h5" variant="h5"></Typography>
                Location : {activity.location}
                <br />
                {moment(activity.date).format("MMM-DD-yyyy")}
                Time : {activity.time}
                <br />
                Attendees : {activity.joins.length}
              </CardContent>
              {/* <CardContent
                style={{
                  background: "#951F3A",
                  color: "White",
                  fontWeight: 600,
                }}
                className={classes.content}
              >
                <Typography component="h5" variant="h5">
                  {moment(activity.date).format("MMM DD")}
                  <br />
                  {moment(activity.date).format("yyyy ")}
                </Typography>
              </CardContent> */}
            </Card>
          </Grid>
        </>
      ))}
    </div>
  );
}

export default ActivitiesList;

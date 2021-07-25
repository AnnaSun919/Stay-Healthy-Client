import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "auto",
    width: "auto",
    maxWidth: "70%",
    margin: 50,
    justify: "center",
  },
  content: {
    display: "flex",

    flex: "1 0 auto",
  },
  img: {
    width: "15%",
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
              <CardContent
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
              </CardContent>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Activity: {activity.name}
                </Typography>
                Location : {activity.location}
                <br />
                Description: {activity.description}
              </CardContent>
              <CardContent className={classes.content}>
                <img
                  className={classes.img}
                  src={activity.image}
                  alt="activitypic"
                />
              </CardContent>
            </Card>
          </Grid>
        </>
      ))}
    </div>
  );
}

export default ActivitiesList;

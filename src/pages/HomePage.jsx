import "../App.css";

import React from "react";
import LottieControl from "../components/LottieControl";
import MeditatJSON from "../animation/Meditation.json";
import moment from "moment";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Avatar, Typography, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    justify: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: 600,
    },
    [theme.breakpoints.up("lg")]: {
      width: 800,
    },
  },

  paper: {
    [theme.breakpoints.down("sm")]: {
      minWidth: 200,
      maxWidth: 250,
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
      backgroundColor: theme.palette.primary.main,
    },

    // width: "auto",

    justify: "center",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      width: 600,
      heigh: 600,
    },
    justify: "center",
  },
}));

function HomePage(props) {
  const { activities } = props;
  console.log(activities);
  const classes = useStyles();

  return (
    <div>
      <LottieControl width={600} height={600} animation={MeditatJSON} />
      <h1>Our Picks </h1>

      {activities.map((elem) => (
        <>
          <div className={classes.container}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/activity/${elem._id}`}
              className={classes.root}
            >
              <Paper className={classes.paper}>
                <Grid item container justify="center" alignItems="center">
                  <img
                    className={classes.image}
                    src={elem.image}
                    alt="actpic"
                  />
                </Grid>
                <Grid
                  justify="center"
                  alignItems="center"
                  container
                  wrap="wrap"
                  spacing={2}
                >
                  {/* <Grid item xs> */}
                  <Typography justify="center" alignItems="center" noWrap>
                    <h1>{elem.name}</h1>
                    <p>
                      {moment(elem.date).format("DD MMM(ddd)")} {elem.time}
                    </p>
                  </Typography>
                  {/* </Grid> */}
                </Grid>
              </Paper>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
}

export default HomePage;

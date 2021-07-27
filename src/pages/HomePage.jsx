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
    // flexGrow: 1,
    display: "flex",
    overflow: "hidden",
    //   // padding: theme.spacing(0, 3),
    // justify: "center",
    // alignItems: "center",
    margin: 50,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "80%",
      heigh: "50%",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "colum",
      width: "80%",
      heigh: "50%",
      // backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "90%",
      flexWrap: "wrap",
      height: "80%",
    },
  },
  // container: {},
  paper: {
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      heigh: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
      heigh: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25%",
      heigh: "25%",
      minheigh: 10000,
      // backgroundColor: theme.palette.primary.main,
    },
    // width: "auto",
    //   justify: "center",
    // margin: `${theme.spacing(1)}px auto`,
    // padding: theme.spacing(2),
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      heigh: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50",
      heigh: "50",
    },
    [theme.breakpoints.up("lg")]: {
      width: "48%",
      height: "38%",

      // backgroundColor: theme.palette.primary.main,
    },
    box: {
      margin: 10,
    },
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
      <div className={classes.root}>
        {activities.map((elem) => (
          <>
            <Link
              to={`/activity/${elem._id}`}
              style={{ textDecoration: "none" }}
              className={classes.paper}
            >
              <Paper>
                <Grid item container justify="center" alignItems="center">
                  <img
                    className={classes.image}
                    src={elem.image}
                    alt="actpic"
                  />
                </Grid>

                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  wrap="wrap"
                  spacing={2}
                >
                  {/* <Grid item xs> */}
                  {/* justify="center" alignItems="center" noWrap */}
                  <Typography>
                    <h3>{elem.name}</h3>
                    {elem.location}
                    <br />
                    Date: {moment(elem.date).format("DD MMM(ddd)")} {elem.time}
                  </Typography>
                  {/* </Grid> */}
                </Grid>
              </Paper>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

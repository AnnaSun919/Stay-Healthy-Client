import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MyNav() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.menuButton} to="/">
              Home
            </Link>
            <Link className={classes.menuButton} to="/signin">
              Sign In
            </Link>
            <Link className={classes.menuButton} to="/signup">
              Sign Up
            </Link>
            <Link className={classes.menuButton} to="/activity">
              Activity
            </Link>
          </Typography>

          <Link className={classes.menuButton} to="/logout">
            Log Out
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

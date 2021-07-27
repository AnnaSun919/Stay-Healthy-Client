import React from "react";
import { Button, TextField, Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    margin: 50,
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
  form: {
    margin: 20,
  },
}));

function SignIn(props) {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <form className={classes.form} onSubmit={props.onSignIn}>
          <div className="form-group">
            <label htmlFor="InputEmail">Username</label>
            <br />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              variant="outlined"
              type="username"
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword">Password</label>
            <br />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              variant="outlined"
              name="password"
              type="password"
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>

          {props.error ? <p>{props.error}</p> : ""}
        </form>
      </Card>
    </Grid>
  );
}

export default SignIn;

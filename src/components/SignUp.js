import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Card, Grid } from "@material-ui/core";
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
function SignUp(props) {
  const { onSignUp } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <form
          className={classes.form}
          onSubmit={onSignUp}
          method="POST"
          action="/upload"
          encType="multipart/form-data"
        >
          <input type="file" name="myImage" accept="image/png, image/jpg" />

          <div className="form-group">
            <label htmlFor="InputUsername">Username</label>

            <br />

            <TextField
              className={classes.textField}
              id="outlined-basic"
              variant="outlined"
              // id="InputUsername"
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="InputPassword">Password</label>
            <br />
            <TextField
              className={classes.textField}
              name="password"
              type="password"
              // id="InputPassword"
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </form>
      </Card>
      {props.error ? <p>{props.error}</p> : ""}
    </Grid>
  );
}

export default SignUp;

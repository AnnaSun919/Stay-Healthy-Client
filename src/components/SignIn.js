import React from "react";

function SignIn(props) {
  return (
    <form onSubmit={props.onSignIn}>
      <div className="form-group">
        <label htmlFor="InputEmail">Username</label>
        <input
          type="username"
          className="form-control"
          id="InputUserName"
          name="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="InputPassword">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="InputPassword"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      {props.error ? <p>{props.error}</p> : ""}
    </form>
  );
}

export default SignIn;

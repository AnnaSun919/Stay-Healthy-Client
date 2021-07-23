import React from "react";

function SignUp(props) {
  const { onSignUp } = props;

  return (
    <form
      onSubmit={onSignUp}
      method="POST"
      action="/upload"
      encType="multipart/form-data"
    >
      <input type="file" name="myImage" accept="image/png, image/jpg" />

      <div className="form-group">
        <label htmlFor="InputUsername">Username</label>
        <input
          type="text"
          className="form-control"
          id="InputUsername"
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

export default SignUp;

import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { API_URL } from "./config";
import axios from "axios";

class App extends Component {
  state = {
    user: null,
    fetchingUser: true,
    myError: null,
  };

  handleSignUp = async (event) => {
    event.preventDefault();

    console.log(event.target);

    const { username, password } = event.target;

    // our new user info
    let newUser = {
      username: username.value,
      password: password.value,
    };

    try {
      await axios.post(`${API_URL}/api/signup`, newUser, {
        withCredentials: true,
      });
      this.props.history.push("/");
    } catch (err) {
      this.setState({
        myError: err.response.data.error,
      });
    }
  };

  handleSignIn = async (event) => {
    event.preventDefault();
    console.log("Sign in works!!!! Yippeeee");
    // event.target here is a `<form>` node
    const { username, password } = event.target;

    // our new user info
    let myUser = {
      username: username.value,
      password: password.value,
    };

    // make a POST signin request to the server
    try {
      let response = await axios.post(`${API_URL}/api/signin`, myUser, {
        withCredentials: true,
      });
      this.setState(
        {
          user: response.data,
        },
        () => {
          this.props.history.push("/");
        }
      );
    } catch (err) {
      this.setState({
        myError: err.response.data.error,
      });
    }
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/signup"
            render={(routeProps) => {
              return <SignUp onSignUp={this.handleSignUp} {...routeProps} />;
            }}
          />
          <Route
            path="/signin"
            render={(routeProps) => {
              return (
                <SignIn
                  error={this.state.myError}
                  onSignIn={this.handleSignIn}
                  {...routeProps}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

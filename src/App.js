import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { API_URL } from "./config";
import axios from "axios";
import HomePage from "./pages/HomePage";
import MyNav from "./components/MyNav";
import ActivitiesList from "./components/activities/ActivitiesList";
import CreateActivity from "./components/activities/CreateActivity";

class App extends Component {
  state = {
    user: null,
    fetchingUser: true,
    myError: null,
  };

  async componentDidMount() {
    try {
      let userResponse = await axios.get(`${API_URL}/api/user`, {
        withCredentials: true,
      });
      this.setState({
        user: userResponse.data,
        fetchingUser: false,
      });
    } catch (err) {
      console.log("User fetch failed", err);
      this.setState({
        fetchingUser: false,
      });
    }
  }

  handleSignUp = async (event) => {
    event.preventDefault();

    const { username, password } = event.target;

    let formData = new FormData();
    formData.append("imageUrl", event.target.myImage.files[0]);

    let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);

    let img1 = imgResponse.data.image;

    let newUser = {
      username: username.value,
      password: password.value,
      image: img1,
    };

    try {
      await axios.post(`${API_URL}/api/signup`, newUser, {
        withCredentials: true,
      });
      this.props.history.push("/");
    } catch (err) {
      this.setState({
        myError: err.response.data.errorMessage,
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

  handleCreateActivity = async (event) => {
    event.preventDefault();
    console.log("HI");
    const { date, time, name, description, location, category } = event.target;
    console.log(this.state.user._id);

    let formData = new FormData();
    formData.append("imageUrl", event.target.myImage.files[0]);

    let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
    console.log(imgResponse.data.image);
    let activity = {
      name: name.value,
      date: date.value,
      time: time.value,
      location: location.value,
      category: category.value,
      description: description.value,
      image: imgResponse.data.image,
      creater: this.state.user._id,
    };

    try {
      await axios.post(`${API_URL}/api/activity/create`, activity, {
        withCredentials: true,
      });
      this.props.history.push("/");
    } catch (err) {
      console.log(err.response);
      // this.setState({
      //   myError: err.response.data.error,
      // });
    }
  };

  render() {
    return (
      <div>
        <MyNav />

        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => {
              return <HomePage {...routeProps} />;
            }}
          />
          <Route
            path="/signup"
            render={(routeProps) => {
              return (
                <SignUp
                  error={this.state.myError}
                  onSignUp={this.handleSignUp}
                  {...routeProps}
                />
              );
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
          <Route
            exact
            path="/activity"
            render={(routeProps) => {
              return (
                <ActivitiesList error={this.state.myError} {...routeProps} />
              );
            }}
          />
          <Route
            path="/activity/create"
            render={(routeProps) => {
              return (
                <CreateActivity
                  error={this.state.myError}
                  onCreateActivity={this.handleCreateActivity}
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

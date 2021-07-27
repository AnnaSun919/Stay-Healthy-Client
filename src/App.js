import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { API_URL } from "./config";
import axios from "axios";
import HomePage from "./pages/HomePage";
import MyNav from "./components/MyNav";
import NotFound from "./components/NotFound";
import ActivitiesList from "./components/activities/ActivitiesList";
import CreateActivity from "./components/activities/CreateActivity";
import EditActivity from "./components/activities/EditActivity";
import ActivityDetails from "./components/activities/ActivityDetails";
import Profile from "./components/user/Profile";
import "./App.css";
import Test from "./pages/Test";

class App extends Component {
  state = {
    activities: [],
    comments: [],
    user: null,
    fetchingUser: true,
    myError: null,
  };

  async componentDidMount() {
    try {
      let commentResponse = await axios.get(`${API_URL}/api/comments`, {
        withCredentials: true,
      });

      this.setState({
        comments: commentResponse.data,
        fetchingActivity: false,
      });
      let activityResponse = await axios.get(`${API_URL}/api/activities`, {
        withCredentials: true,
      });

      this.setState({
        activities: activityResponse.data,
        fetchingActivity: false,
      });

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
        fetchingActivity: false,
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
    const { date, time, name, description, location, category, comments } =
      event.target;

    let formData = new FormData();
    formData.append("imageUrl", event.target.myImage.files[0]);

    let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);

    let activity = {
      name: name.value,
      date: date.value,
      time: time.value,
      location: location.value,
      category: category.value,
      description: description.value,
      image: imgResponse.data.image,
      comments: comments,
      creater: this.state.user._id,
    };

    try {
      let response = await axios.post(
        `${API_URL}/api/activity/create`,
        activity,
        {
          withCredentials: true,
        }
      );
      this.setState(
        {
          activities: [response.data, ...this.state.activities],
        },
        () => {
          // to do something synchronous with the setState

          // redirects the app to a certain url
          // we're using the history push method to redirect it to any url we want
          this.props.history.push("/activity");
        }
      );
    } catch (err) {
      console.log(err.response);
      this.setState({
        myError: err.response.data.error,
      });
    }
  };

  handleEditActivity = (event, activity) => {
    event.preventDefault();

    axios
      .patch(`${API_URL}/api/activity/${activity._id}/edit`, activity, {
        withCredentials: true,
      })
      .then(() => {
        let updatedactivities = this.state.activities.map((activ) => {
          if (activ._id === activity._id) {
            activ.name = activity.name;
            activ.location = activity.location;
            activ.time = activity.time;
            activ.date = activity.date;
            activ.description = activity.description;
          }
          return activ;
        });

        this.setState(
          {
            activities: updatedactivities,
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(() => {
        console.log("Edit failed");
      });
  };

  handleDeleteActivity = async (Id) => {
    try {
      await axios.delete(`${API_URL}/api/activity/${Id}`);
      console.log("Hi");
      let filteredactivity = this.state.activities.filter((activity) => {
        return activity._id !== Id;
      });
      this.setState(
        {
          activities: filteredactivity,
        },
        () => {
          this.props.history.push("/activity");
        }
      );
    } catch (err) {
      console.log("activity fetch failed", err);
    }
  };

  handleCreateComment = async (event, activity) => {
    event.preventDefault();

    const { comment } = event.target;

    let usercomment = {
      comment: comment.value,
      creater: this.state.user._id,
      createrimg: this.state.user.image,
      activity: activity._id,
    };

    try {
      let response = await axios.post(
        `${API_URL}/api/comment/create`,
        usercomment,
        {
          withCredentials: true,
        }
      );
      this.setState({
        comments: [...this.state.comments, usercomment],
      });
      console.log(JSON.stringify(usercomment));

      console.log(`hello ${response.data}`);
    } catch (err) {
      // console.log(err.response);
      // this.setState({
      //   myError: err.response.data.error,
      // });
    }
  };

  handleJoin = async (event, id) => {
    event.preventDefault();

    let join = {
      join: this.state.user._id,
    };

    try {
      await axios.post(`${API_URL}/api/activity/${id}/join`, join, {
        withCredentials: true,
      });
      this.props.history.push("/");
    } catch (err) {
      console.log("Join failed", err);
    }
  };

  handleLogOut = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
      this.setState(
        {
          user: null,
        },
        () => {
          this.props.history.push("/");
        }
      );
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  render() {
    console.log(this.state.user);
    console.log("App props", this.props);

    if (this.state.fetchingActivity && this.state.fetchingUser) {
      return <p>Loading . . . </p>;
    }
    return (
      <div>
        <MyNav user={this.state.user} onHandleLogOut={this.handleLogOut} />

        <Switch>
          <Route
            exact
            path="/activity"
            render={(routeProps) => {
              return (
                <ActivitiesList
                  activities={this.state.activities}
                  error={this.state.myError}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            exact
            path="/"
            render={(routeProps) => {
              return (
                <HomePage {...routeProps} activities={this.state.activities} />
              );
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

          <Route
            path={`/activity/:id/edit`}
            render={(routeProps) => {
              return (
                <EditActivity
                  // activities={this.state.activities}
                  onEdit={this.handleEditActivity}
                  error={this.state.myError}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            exact
            path={`/activity/:id`}
            render={(routeProps) => {
              return (
                <ActivityDetails
                  onHandleJoin={this.handleJoin}
                  activities={this.state.activities}
                  onDelete={this.handleDeleteActivity}
                  onCreateComment={this.handleCreateComment}
                  error={this.state.myError}
                  comments={this.state.comments}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            exact
            path={`/profile`}
            render={(routeProps) => {
              return <Profile error={this.state.myError} {...routeProps} />;
            }}
          />
          <Route
            exact
            path={`/test`}
            render={(routeProps) => {
              return <Test error={this.state.myError} {...routeProps} />;
            }}
          />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

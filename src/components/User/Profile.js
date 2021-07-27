import { API_URL } from "../../config";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ActivityDetails from "../activities/ActivityDetails";

function Profile(props) {
  const { activities } = props;

  if (!props.user) {
    return (
      <p>
        Please login <Link to="/signin">login</Link>{" "}
      </p>
    );
  } else if (!props.user) {
    <p>Loading</p>;
  }

  const joinedactivites = activities.filter(({ joins }) =>
    joins.includes(props.user._id)
  );

  const createdactivites = activities.filter(({ creater }) =>
    creater.includes(props.user._id)
  );
  return (
    <div>
      Profile
      <h1>Created Activities</h1>
      {createdactivites.map((elem) => (
        <>
          <h1>{elem.name}</h1>
        </>
      ))}
      <h1>Joined Activities</h1>
      {joinedactivites.map((elem) => (
        <>
          <h1>{elem.name}</h1>
        </>
      ))}
    </div>
  );
}

export default Profile;

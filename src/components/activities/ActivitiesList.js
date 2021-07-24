import React from "react";
import { Link } from "react-router-dom";

function ActivitiesList(props) {
  const { activities } = props;
  return (
    <div>
      <Link to="/activity/create">Create Activity</Link>
      <br />
      {activities.map((activity) => (
        <>
          <Link to={`/activity/${activity._id}`}>
            <img src={activity.image} alt="activitypic" />
            <br />
          </Link>
        </>
      ))}
    </div>
  );
}

export default ActivitiesList;

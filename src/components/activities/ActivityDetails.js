import { API_URL } from "../../config";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  image: {
    height: "25%",
    width: "25%",
  },
}));

function ActivityDetails(props) {
  const classes = useStyles();

  const [activityDetail, updateActiviy] = useState(null);

  const { onCreateComment } = props;

  // useEffect(async () => {
  //   try {

  //     let id = props.match.params.id;
  //     let response = await axios.get(`${API_URL}/api/activity/${id}`);
  //     updateActiviy(response.data);
  //   } catch (err) {
  //     console.log("Activity fetch failed", err);
  //   }
  // }, []);

  useEffect(() => {
    try {
      async function getData() {
        let activityId = props.match.params.id;
        let response = await axios.get(`${API_URL}/api/activity/${activityId}`);
        updateActiviy(response.data);
      }

      getData();
    } catch (err) {
      console.log("Activity fetch failed", err);
    }
  }, []);

  if (!activityDetail) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h4>Name: {activityDetail.name}</h4>
      <h4>
        Host:
        <Avatar src={activityDetail.creater.image} alt="User" />
        <img className={classes.image} src={activityDetail.image} />
      </h4>

      <h6>Description: {activityDetail.description}</h6>
      <Link to={`/activity/${activityDetail._id}/edit`}>
        <button>Edit</button>
      </Link>

      <button
        onClick={() => {
          props.onDelete(activityDetail._id);
        }}
      >
        Delete
      </button>

      <Comment
        activityDetail={activityDetail}
        onCreateComment={(event) => onCreateComment(event, activityDetail)}
      />
    </div>
  );
}

export default ActivityDetails;

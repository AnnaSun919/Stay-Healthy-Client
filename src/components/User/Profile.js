import { API_URL } from "../../config";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Profile() {
  useEffect(() => {
    try {
      async function getData() {
        let response = await axios.get(`${API_URL}/api/profile`);
        console.log(response.data);
      }

      getData();
    } catch (err) {
      console.log("Activity fetch failed", err);
    }
  }, []);

  return <div>Profile</div>;
}

export default Profile;

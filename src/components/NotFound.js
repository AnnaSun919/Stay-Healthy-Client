import React from "react";
import LottieControl from "./LottieControl";
import UFOJson from "../animation/UFO.json";

function NotFound() {
  return (
    <div>
      404 Not Found
      <LottieControl width={400} height={600} animation={UFOJson} />
    </div>
  );
}

export default NotFound;

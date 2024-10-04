import React from "react";
import { Popup } from "reactjs-popup";

export default function LogPopup() {
  return (
    <Popup>
      <h3>Write some feedback!</h3>
      <hr />
      <label htmlFor="name">Enter your name:</label>
      <input type="text" id="name" />
      <label htmlFor="log">Enter your feedback:</label>
      <input type="text" id="log" />
      <input type="submit" id="submit" />
    </Popup>
  );
}

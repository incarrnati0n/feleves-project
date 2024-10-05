import { useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";

interface LogPopupProps {
  openPopup: boolean;
  setOpenPopup: (open: boolean) => void;
}

export default function LogPopup({ openPopup, setOpenPopup }: LogPopupProps) {
  const [name, setName] = useState("");
  const [log, setLog] = useState("");

  const handleClosePopup = () => {
    setName("");
    setLog("");
    setOpenPopup(false);
  };

  function createLog(name: string, log: string) {
    const jsonPayload = {
      name: name,
      log: log,
    };

    axios.post("/createLog", jsonPayload).then((res) => {
      if (res.status === 201) {
        console.log("Successfully added log!");
      } else {
        console.log("Oh no something went wrong!");
      }
    });
  }

  return (
    <Popup
      open={openPopup}
      position={"center center"}
      onClose={handleClosePopup}
    >
      <h3>Leave a log!</h3>
      <hr />
      <label></label>
      <input
        type="text"
        placeholder="Enter name..."
        value={name}
        id="name-input"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter log..."
        value={log}
        id="log-input"
        onChange={(e) => setLog(e.target.value)}
      />
      <button onClick={() => createLog(name, log)}>Send Request</button>
      <button onClick={handleClosePopup}>Cancel</button>
    </Popup>
  );
}

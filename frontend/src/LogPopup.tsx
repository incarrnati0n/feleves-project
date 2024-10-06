import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box, // Import Box from Material UI
} from "@mui/material";

interface LogPopupProps {
  reload: number;
  setReload: React.Dispatch<React.SetStateAction<number>>;
}

export default function LogPopup({ reload, setReload }: LogPopupProps) {
  const [open, setOpen] = useState(false); // State to handle dialog open/close
  const [name, setName] = useState("");
  const [log, setLog] = useState("");
  const [responseText, setResponseText] = useState("");
  const [openResponse, setOpenResponse] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setLog("");
  };

  const handleReponseOpen = () => {
    setOpenResponse(true);
  };

  const handleReponseClose = () => {
    setOpenResponse(false);
    setResponseText("");
  };

  function createLog() {
    const jsonPayload = {
      name: name,
      log: log,
    };

    axios.post("/createLog", jsonPayload).then((res) => {
      if (res.status === 201) {
        setReload(reload + 1);
        setResponseText("Log successfully added!");
        handleReponseOpen();
      } else {
        setResponseText("Something went wrong...");
        handleReponseOpen();
      }
    });

    handleClose();
  }

  return (
    <>
      {/* Center the button and add margin */}
      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Leave a note!
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a note!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            margin="dense"
            label="Log"
            fullWidth
            required
            value={log}
            onChange={(e) => setLog(e.target.value)}
            inputProps={{ maxLength: 40 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createLog}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openResponse} onClose={handleReponseClose}>
        <DialogContent>{responseText}</DialogContent>
        <DialogActions>
          <Button onClick={handleReponseClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Bar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cloud Hotel
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

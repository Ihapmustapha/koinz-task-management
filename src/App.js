import React from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import { TaskManagement } from "./views";

function App() {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="center"
      className="root"
    >
      <TaskManagement />
    </Grid>
  );
}

export default App;

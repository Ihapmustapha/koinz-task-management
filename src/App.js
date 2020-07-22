import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { Grid } from "@material-ui/core";
import { configureStore } from "./store";

import "./App.css";
import { TaskManagement } from "./views";

function App() {
  const store = configureStore();
  return (
    <StoreProvider store={store}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        className="root"
      >
        <TaskManagement />
      </Grid>
    </StoreProvider>
  );
}

export default App;

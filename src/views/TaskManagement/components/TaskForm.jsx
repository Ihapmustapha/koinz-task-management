import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";

const TaskForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ width: "450px" }}
      >
        <Grid item style={{ width: "400px" }}>
          <TextField
            variant="outlined"
            placeholder="Task Description"
            label="Task Description"
            name="description"
            fullWidth
            multiline
            rowsMax={5}
            rows={5}
          />
        </Grid>
        <Grid item style={{ width: "400px", marginTop: "5px" }}>
          <Button
            types="submit"
            fullWidth
            variant="contained"
            disableElevation
            color="primary"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;

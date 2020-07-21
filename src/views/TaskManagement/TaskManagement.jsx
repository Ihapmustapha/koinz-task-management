import React, { useState } from "react";
// prop-types
import PropTypes from "prop-types";
// beautiful-react-dnd
import { DragDropContext } from "react-beautiful-dnd";
// components
import { withStyles, Grid } from "@material-ui/core";
import { Column } from "./components";

// styles
import styles from "./styles";

const TaskManagement = ({ classes }) => {
  const [state, setState] = useState({
    tasks: {},
    columns: {
      assigned: {
        id: "assigned",
        title: "Assigned",
        taskIds: [],
      },
      inProgress: {
        id: "inProgress",
        title: "In progress",
        taskIds: [],
      },
      done: {
        id: "done",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["assigned", "inProgress", "done"],
  });

  const onDragEnd = () => {};

  return (
    <Grid
      container
      item
      xs={12}
      xl={12}
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId) => {
          const columnObj = state.columns[columnId];
          const arrOfTasks = columnObj.taskIds.map(
            (taskId) => state.tasks[taskId]
          );
          return (
            <Column key={columnId} column={columnObj} tasks={arrOfTasks} />
          );
        })}
      </DragDropContext>
    </Grid>
  );
};

TaskManagement.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TaskManagement);

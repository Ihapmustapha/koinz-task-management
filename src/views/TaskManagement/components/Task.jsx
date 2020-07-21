import React from "react";
// prop-types
import PropTypes from "prop-types";
// react-beautiful-dnd
import { Draggable } from "react-beautiful-dnd";
// components
import { Paper, Grid, Typography, withStyles } from "@material-ui/core";
// styles
import styles from "../styles";

const Task = ({ task, index, onClick, classes }) => {
  const { id, description, history, taskStatus } = task;
  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={taskStatus && taskStatus === "done"}
    >
      {(provided, snapshot) => (
        <Paper
          className={classes.taskCard}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          innerRef={provided.innerRef}
        >
          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            onClick={onClick}
            id={id}
          >
            <Grid item xs={12} lg={12}>
              {description && (
                <Typography variant="caption" component="p">
                  {description}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    history: PropTypes.shape,
    taskStatus: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    taskCard: PropTypes.string,
  }).isRequired,
};
export default withStyles(styles)(Task);

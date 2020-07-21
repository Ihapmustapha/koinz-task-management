import React from "react";
// prop-types
import PropTypes from "prop-types";
// react-beautiful-dnd
import { Draggable } from "react-beautiful-dnd";
// components
import { Paper, Grid, Typography } from "@material-ui/core";

const Task = ({ task, index, onClick }) => {
  const { id, description, history } = task;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Grid
          component={Paper}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          innerRef={provided.innerRef}
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          onClick={onClick}
          id={id}
          className={
            snapshot.isDragging ? "task-card-is-dragging" : "task-card"
          }
        >
          <div style={{ maxWidth: "370px" }}>
            <Grid item xs={12} lg={12}>
              {description && (
                <Typography variant="caption" component="p">
                  {description}
                </Typography>
              )}
            </Grid>
          </div>
        </Grid>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    history: PropTypes.shape.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Task;

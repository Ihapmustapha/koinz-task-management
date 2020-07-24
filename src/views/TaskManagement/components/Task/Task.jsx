import React from "react";
// prop-types
import PropTypes from "prop-types";
// react-beautiful-dnd
import { Draggable } from "react-beautiful-dnd";
// components
import { Paper, Grid, Typography, withStyles, Fab } from "@material-ui/core";
// styles
import styles from "../../styles";
// icons
import ViewIcon from "../../../../assets/view.svg";

const Task = ({ task, index, onClick, classes }) => {
  const { id, description, taskStatus } = task;
  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={taskStatus && taskStatus === "done"}
    >
      {(provided) => (
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
          >
            <Grid item xs={12} lg={12}>
              {description && (
                <Typography variant="caption" component="p">
                  {description}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
              xs={12}
              lg={12}
            >
              <Fab
                size="small"
                onClick={onClick(id)}
                variant="extended"
                color="inherit"
                style={{ boxShadow: "none" }}
              >
                <img alt="view icon" src={ViewIcon} style={{ width: "15px" }} />
              </Fab>
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
    history: PropTypes.shape({}),
    taskStatus: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    taskCard: PropTypes.string,
  }).isRequired,
};
export default withStyles(styles)(Task);

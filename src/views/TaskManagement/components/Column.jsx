import React from "react";
// prop-types
import PropTypes from "prop-types";
// react-beautiful-dnd
import { Droppable } from "react-beautiful-dnd";
// components
import {
  Grid,
  Paper,
  Divider,
  Tooltip,
  Fab,
  Typography,
  withStyles,
} from "@material-ui/core";
import Task from "./Task";
// styles
import styles from "../styles";

const Column = ({ column, tasks, classes }) => {
  const { title, id } = column;
  const handleTaskCardClick = () => {};
  const handleNewTaskButtonClick = () => {};
  return (
    <>
      {/* <Modal /> */}
      <Grid
        component={Paper}
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        elevation={3}
        className={classes.columnPaper}
      >
        <Grid
          item
          xs={12}
          lg={12}
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="body2" className={classes.columnTitle}>
              {title}
            </Typography>
            <Divider className={classes.titleDivider} />
          </Grid>
          <Grid item>
            <Droppable droppableId={id}>
              {(provided) => (
                <div
                  className={classes.tasksListContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.length > 0 &&
                    tasks.map(
                      (task, index) =>
                        task && (
                          <Task
                            key={task.id}
                            id={task.id}
                            index={index}
                            task={task}
                            onClick={handleTaskCardClick}
                          />
                        )
                    )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="flex-end"
            justify="flex-end"
          >
            <Grid item>
              {id === "assigned" && (
                <Tooltip title="Add New Task">
                  <Fab
                    onClick={handleNewTaskButtonClick}
                    className={classes.addButton}
                    color="primary"
                    size="medium"
                  >
                    +
                  </Fab>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

Column.propTypes = {
  classes: PropTypes.shape({
    columnPaper: PropTypes.string,
    columnTitle: PropTypes.string,
    titleDivider: PropTypes.string,
    tasksListContainer: PropTypes.string,
    addButton: PropTypes.string,
  }).isRequired,
  column: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Column);

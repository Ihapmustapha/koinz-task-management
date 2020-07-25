import React from "react";
// prop-types
import PropTypes from "prop-types";
// redux
import { compose } from "redux";
import { connect } from "react-redux";
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
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import { ContainerModal } from "../../../../components";
// redux actions
import * as actions from "../../../../store/actions";
// styles
import styles from "../../styles";
// icons
import AddIcon from "../../../../assets/plus.svg";

const Column = ({
  column,
  tasks,
  classes,
  openModal,
  formType,
  updateTaskFormState,
  clearTaskFormState,
}) => {
  const { title, id } = column;

  const handleTaskCardClick = (selectedTaskId) => () => {
    const selectedTaskDetails = tasks.filter(
      (element) => element.id === selectedTaskId
    )[0];
    if (selectedTaskDetails) {
      clearTaskFormState();
      updateTaskFormState({ formType: "update", selectedTaskDetails });
      openModal();
    }
  };

  const handleNewTaskButtonClick = () => {
    clearTaskFormState();
    openModal();
  };

  return (
    <>
      {/* <Modal /> */}
      <ContainerModal
        title={formType === "add" ? "Add New Task" : "Update Task"}
      >
        <TaskForm />
      </ContainerModal>

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
            <Typography
              variant="body2"
              data-testid="column-title-test-id"
              className={classes.columnTitle}
            >
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
              {id === "todo" && (
                <Tooltip title="Add New Task">
                  <Fab
                    onClick={handleNewTaskButtonClick}
                    className={classes.addButton}
                    color="primary"
                    size="medium"
                    data-testid="add-task-fab-test-id"
                  >
                    <img
                      src={AddIcon}
                      alt="add icon"
                      className={classes.addIcon}
                    />
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
    addIcon: PropTypes.string,
  }).isRequired,
  column: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  updateTaskFormState: PropTypes.func.isRequired,
  clearTaskFormState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    formType: state.taskForm.formType,
    selectedTaskDetails: state.taskForm.selectedTaskDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(actions.openModal()),
  closeModal: () => dispatch(actions.closeModal()),
  updateTaskFormState: (newState) =>
    dispatch(actions.updateTaskFormState(newState)),
  clearTaskFormState: () => dispatch(actions.clearTaskFormState()),
  handleTaskDescriptionChange: (value) =>
    dispatch(actions.handleTaskDescriptionChange(value)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Column);

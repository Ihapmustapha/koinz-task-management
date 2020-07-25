import React, { useState } from "react";
// prop-types
import PropTypes from "prop-types";
// redux connect
import { connect } from "react-redux";
// components
import { TextField, Grid, Button } from "@material-ui/core";
// redux actions
import * as actions from "../../../../store/actions";
// helpers
import { getDateOfNow } from "../../../../utils/helpers";

const TaskForm = ({
  formType,
  selectedTaskDetails,
  closeModal,
  addTask,
  fetchTasks,
  updateTask,
  deleteTask,
  handleTaskDescriptionChange,
  clearTaskFormState,
}) => {
  // update button state
  const [updateButtonIsDisabled, setUpdateButtonIsDisabled] = useState(true);

  // handling description input changes
  const onChange = (e) => {
    handleTaskDescriptionChange(e.target.value);
    // enable update button when user starts typing
    if (formType === "update") setUpdateButtonIsDisabled(false);
  };

  // handle submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (formType === "add") {
      addTask(
        {
          ...selectedTaskDetails,
          history: { notes: [`Task Added at ${getDateOfNow()}`] },
          taskStatus: "todo",
        },
        () => {
          clearTaskFormState();
          closeModal();
          // to update rendered tasks
          fetchTasks();
        }
      );
    } else if (formType === "update") {
      const updatedTaskDetails = {
        ...selectedTaskDetails,
        history: {
          notes: [
            ...selectedTaskDetails.history.notes,
            `Task Details Updated at ${getDateOfNow()}`,
          ],
        },
      };
      updateTask(updatedTaskDetails, () => {
        clearTaskFormState();
        closeModal();
        // to update rendered tasks
        fetchTasks();
      });
    }
  };

  const handleTaskDeletion = () => {
    const taskId = selectedTaskDetails.id;
    deleteTask(taskId, () => {
      clearTaskFormState();
      closeModal();
      fetchTasks();
    });
  };

  const { description } = selectedTaskDetails;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ width: "450px" }}
    >
      <form onSubmit={onSubmit}>
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
            onChange={onChange}
            value={description}
            data-testid="test-description-input-id"
          />
        </Grid>
        {formType === "update" && (
          <Grid
            item
            container
            diraction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ width: "400px", marginTop: "5px" }}
          >
            <Grid item>
              <p style={{ fontSize: "12px", fontWeight: 500 }}>Task History</p>
              <ul>
                {selectedTaskDetails?.history?.notes &&
                  selectedTaskDetails.history.notes.map((historyElement) => (
                    <li key={historyElement} style={{ fontSize: "11px" }}>
                      {historyElement}
                    </li>
                  ))}
              </ul>
            </Grid>
          </Grid>
        )}
        <Grid item style={{ width: "400px", marginTop: "5px" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            color="primary"
            disabled={formType === "update" && updateButtonIsDisabled}
          >
            {formType}
          </Button>
        </Grid>
      </form>
      <Grid item style={{ width: "400px", marginTop: "5px" }}>
        <Button
          fullWidth
          variant="text"
          disableElevation
          color="inherit"
          onClick={closeModal}
          id="test-cancel-button"
        >
          Cancel
        </Button>
      </Grid>
      <Grid item style={{ width: "400px", marginTop: "5px" }}>
        {formType === "update" && (
          <Button
            fullWidth
            variant="outlined"
            disableElevation
            color="secondary"
            onClick={handleTaskDeletion}
            id="test-delete-button"
          >
            Delete
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

TaskForm.defaultProps = {
  selectedTaskDetails: {
    description: "",
  },
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  selectedTaskDetails: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    history: PropTypes.shape({ notes: PropTypes.arrayOf(PropTypes.string) }),
  }),
  closeModal: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleTaskDescriptionChange: PropTypes.func.isRequired,
  clearTaskFormState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    formType: state.taskForm.formType,
    selectedTaskDetails: state.taskForm.selectedTaskDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addTask: (taskDetails, callbackFunc) =>
    dispatch(actions.addTask(taskDetails, callbackFunc)),
  fetchTasks: () => dispatch(actions.fetchTasks()),
  updateTask: (taskDetails, callbackFunc) =>
    dispatch(actions.updateTask(taskDetails, callbackFunc)),
  deleteTask: (taskId, callbackFunc) =>
    dispatch(actions.deleteTask(taskId, callbackFunc)),
  closeModal: () => dispatch(actions.closeModal()),
  updateTaskFormState: (newState) =>
    dispatch(actions.updateTaskFormState(newState)),
  clearTaskFormState: () => dispatch(actions.clearTaskFormState()),
  handleTaskDescriptionChange: (value) =>
    dispatch(actions.handleTaskDescriptionChange(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);

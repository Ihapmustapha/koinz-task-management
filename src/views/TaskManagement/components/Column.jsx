import React, { useState } from "react";
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
import Task from "./Task";
import TaskForm from "./TaskForm";
import { ContainerModal } from "../../../components";
// redux actions
import * as actions from "../../../store/actions";
// styles
import styles from "../styles";
// icons
import AddIcon from "../../../assets/plus.svg";

const Column = ({ column, tasks, classes, openModal }) => {
  const { title, id } = column;

  const [modalChildren, setModalChildren] = useState(null);
  const [formType, setFormType] = useState("");

  const handleTaskCardClick = (selectedTaskId) => (e) => {
    const selectedTaskDetails = tasks.filter(
      (element) => element.id === selectedTaskId
    )[0];
    if (selectedTaskDetails) {
      setFormType("update");
      setModalChildren(
        <TaskForm formType="update" selectedTaskDetails={selectedTaskDetails} />
      );
      openModal();
    }
  };

  const handleNewTaskButtonClick = () => {
    setFormType("add");
    setModalChildren(<TaskForm formType="add" selectedTaskDetails={null} />);
    openModal();
  };

  return (
    <>
      {/* <Modal /> */}
      {modalChildren && (
        <ContainerModal
          title={formType === "add" ? "Add New Task" : "Update Task"}
        >
          {modalChildren}
        </ContainerModal>
      )}
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
              {id === "todo" && (
                <Tooltip title="Add New Task">
                  <Fab
                    onClick={handleNewTaskButtonClick}
                    className={classes.addButton}
                    color="primary"
                    size="medium"
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
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(actions.openModal()),
  closeModal: () => dispatch(actions.closeModal()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Column);

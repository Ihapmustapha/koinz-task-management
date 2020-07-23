import React, { useState, useEffect } from "react";
// prop-types
import PropTypes from "prop-types";
// redux
import { compose } from "redux";
import { connect } from "react-redux";
// beautiful-react-dnd
import { DragDropContext } from "react-beautiful-dnd";
// components
import { withStyles, Grid } from "@material-ui/core";
import { Column } from "./components";
// styles
import styles from "./styles";
// actions
import * as actions from "../../store/actions";
import { tasksMapper } from "../../mappers";

const TaskManagement = ({ fetchTasks, tasksList }) => {
  const [state, setState] = useState({
    tasks: {},
    columns: {},
    columnOrder: ["todo", "inProgress", "done"],
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const mappedTasks = tasksMapper(tasksList);

    const columns = {
      todo: {
        id: "todo",
        title: "To Do",
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
    };

    tasksList.forEach((task) => {
      if (task.id && task.taskStatus) {
        columns[task.taskStatus].taskIds.push(task.id);
      }
    });

    setState({ ...state, tasks: mappedTasks, columns });
  }, [tasksList]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    const { columns } = state;

    // user dropped it outside all droppables
    if (!destination) return;
    // user didn't change item position, dragged and
    // -> dropped at the same possition
    const startColumn = { ...columns[source.droppableId] };
    const endColumn = { ...columns[destination.droppableId] };

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newStartTaskIds = [...startColumn.taskIds];
    const newEndColumnTaskIds = [...endColumn.taskIds];

    // reordering inside the same column
    newStartTaskIds.splice(source.index, 1);

    if (startColumn.id === endColumn.id) {
      newStartTaskIds.splice(destination.index, 0, draggableId);
      const newStartColumn = {
        ...startColumn,
        taskIds: newStartTaskIds,
      };
      setState({
        ...state,
        columns: { ...columns, [newStartColumn.id]: newStartColumn },
      });
      return;
    }

    // source !== destination
    // checking on accepted flows
    // todo => inProgress => done,
    // inProgress => todo || inProgress => done,
    // done => nowhere
    if (
      source.droppableId === "todo" &&
      destination.droppableId !== "inProgress"
    )
      return;
    if (source.droppableId === "done") return;
    // handling accepted flows
    const newStartColumn = {
      ...startColumn,
      taskIds: newStartTaskIds,
    };

    newEndColumnTaskIds.splice(destination.index, 0, draggableId);

    const newEndColumn = {
      ...endColumn,
      taskIds: newEndColumnTaskIds,
    };

    const newTaskStatus = newEndColumn.id;
    const taskId = draggableId;
    const newTasks = { ...state.tasks };
    const newTaskData = { ...newTasks[taskId] };
    newTaskData.taskStatus = newTaskStatus;
    newTasks[taskId] = newTaskData;

    setState({
      ...state,
      tasks: newTasks,
      columns: {
        ...columns,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn,
      },
    });
  };

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
      {Object.entries(state.columns).length > 0 && (
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
      )}
    </Grid>
  );
};

TaskManagement.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  fetchTasks: PropTypes.func.isRequired,
  tasksList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  console.log(state.taskManagement);
  return {
    tasksList: state?.taskManagement?.tasksList || [],
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchTasks: () => dispatch(actions.fetchTasks()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(TaskManagement);

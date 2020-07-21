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
    tasks: {
      task1: {
        description: "hello",
        id: "task1",
        history: {},
        taskStatus: "assigned",
      },
      task2: {
        description: "hello",
        id: "task2",
        history: {},
        taskStatus: "assigned",
      },
      task3: {
        description: "hello",
        id: "task3",
        history: {},
        taskStatus: "assigned",
      },
      task4: {
        description: "hello",
        id: "task4",
        history: {},
        taskStatus: "assigned",
      },
    },
    columns: {
      assigned: {
        id: "assigned",
        title: "Assigned",
        taskIds: ["task1", "task2", "task3", "task4"],
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
    // assigned => inProgress => done,
    // inProgress => assigned || inProgress => done,
    // done => nowhere
    if (
      source.droppableId === "assigned" &&
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

import unique from "unique-string";
import * as actions from "./actionTypes";
import {
  idbReadItem,
  idbAddItem,
  idbUpdateItem,
  idbDeleteItem,
} from "../../services";

// fetch
export const fetchTask = (taskId, param = null) => {
  return (dispatch) => {
    idbReadItem(taskId, param)
      .then((response) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST, payload: response });
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

// add
export const addTask = (taskDetails) => {
  return (dispatch) => {
    const id = unique();
    idbAddItem({ ...taskDetails, id })
      .then(() => {
        fetchTask(null, "getAll");
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

// update
export const updateTask = (taskDetails) => {
  return (dispatch) => {
    idbUpdateItem(taskDetails)
      .then(() => {
        fetchTask(null, "getAll");
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

// delete
export const deleteTask = (taskId) => {
  return (dispatch) => {
    idbDeleteItem(taskId)
      .then(() => {
        fetchTask(null, "getAll");
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

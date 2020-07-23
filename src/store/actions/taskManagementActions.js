import unique from "unique-string";
import * as actions from "./actionTypes";
import {
  idbReadAll,
  idbAddItem,
  idbUpdateItem,
  idbDeleteItem,
} from "../../services";

// fetch
export const fetchTasks = () => {
  return (dispatch) => {
    idbReadAll()
      .then((response) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST, payload: response });
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

// add
export const addTask = (taskDetails, callbackFunc) => {
  return (dispatch) => {
    const id = unique();
    idbAddItem({ ...taskDetails, id })
      .then(() => {
        if (callbackFunc) callbackFunc();
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

// update
export const updateTask = (taskDetails, callbackFunc) => {
  return (dispatch) => {
    idbUpdateItem(taskDetails)
      .then(() => {
        if (callbackFunc) callbackFunc();
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

// delete
export const deleteTask = (key, callbackFunc) => {
  return (dispatch) => {
    idbDeleteItem(key)
      .then(() => {
        if (callbackFunc) callbackFunc();
      })
      .catch((error) => {
        dispatch({ type: actions.UPDATE_TASKS_LIST_FAIL, error });
      });
  };
};

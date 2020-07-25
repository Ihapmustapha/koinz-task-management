import * as actionTypes from "./actionTypes";

export const updateTaskFormState = (newFormState) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_TASK_FORM_STATE,
    payload: newFormState,
  });
};

export const clearTaskFormState = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_TASK_FORM_STATE,
  });
};

export const handleTaskDescriptionChange = (value) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_TASK_DESCRIPTION,
    payload: value,
  });
};

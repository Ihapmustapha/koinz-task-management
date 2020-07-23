import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tasksList: [],
  error: null,
};

const taskManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TASKS_LIST: {
      return {
        ...initialState,
        tasksList: action.payload,
        error: null,
      };
    }

    case actionTypes.UPDATE_TASKS_LIST_FAIL: {
      return {
        ...initialState,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};

export default taskManagementReducer;

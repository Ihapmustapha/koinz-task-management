import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedTaskDetails: {
    description: "",
  },
  formType: "add",
};

const taskFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TASK_FORM_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case actionTypes.CLEAR_TASK_FORM_STATE: {
      return {
        ...state,
        selectedTaskDetails: {
          description: "",
        },
        formType: "add",
      };
    }

    case actionTypes.SET_TASK_DESCRIPTION: {
      return {
        ...state,
        selectedTaskDetails: {
          ...state.selectedTaskDetails,
          description: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default taskFormReducer;

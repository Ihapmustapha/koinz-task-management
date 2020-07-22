import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isOpen: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL: {
      return {
        ...initialState,
        isOpen: true,
      };
    }

    case actionTypes.CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default modalReducer;

import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import taskManagementReducer from "./taskManagementReduce";

const rootReducer = combineReducers({
  modalState: modalReducer,
  taskManagement: taskManagementReducer,
});

export default rootReducer;

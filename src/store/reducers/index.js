import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import taskManagementReducer from "./taskManagementReduce";
import taskFormReducer from "./TaskFormReducer";

const rootReducer = combineReducers({
  modalState: modalReducer,
  taskManagement: taskManagementReducer,
  taskForm: taskFormReducer,
});

export default rootReducer;

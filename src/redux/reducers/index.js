import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import alertReducer from "./alertReducer";

export default combineReducers({ sessionReducer, alertReducer});
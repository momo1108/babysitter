import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import alertReducer from "./alertReducer";
import idpassReducer from "./idpassReducer";

export default combineReducers({ sessionReducer, alertReducer, idpassReducer });
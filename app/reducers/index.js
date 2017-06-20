import { combineReducers } from "redux";
import * as iotaReducer from "./iota";
import * as cryptoReducer from "./crypto";

export default combineReducers(Object.assign(iotaReducer, cryptoReducer));

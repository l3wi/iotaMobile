import createReducer from "../libs/createReducer";
import * as types from "../actions/types";

export const iota = createReducer(
  {},
  {
    [types.SET_ACCOUNT](state, action) {
      let newState = state;
      newState.account = action.account;
      return newState;
    },
    [types.SET_PWD](state, action) {
      let newState = state;
      newState.pwd = action.pwd;
      return newState;
    }
  }
);

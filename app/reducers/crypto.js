import createReducer from "../libs/createReducer";
import * as types from "../actions/types";

export const crypto = createReducer(
  {},
  {
    [types.BOX_FLAG](state, action) {
      let newState = state;
      newState.box = action.box;
      return { ...newState };
    },
    [types.SET_PWD](state, action) {
      let newState = state;
      newState.pwd = action.pwd;
      return { ...newState };
    },
    [types.SET_REMEMBER](state, action) {
      let newState = state;
      newState.remember = action.remember;
      return { ...newState };
    }
  }
);

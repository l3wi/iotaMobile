import * as types from "./types";
import { RetrieveBox, DeleteBox, OpenBox, hashPwd } from "../libs/crypto";

//// Async
export const checkBox = () => {
  return (dispatch, getState) => {
    RetrieveBox("seed").then(box => {
      if (box) {
        return dispatch(boxFlag(true));
      } else {
        return dispatch(boxFlag(false));
      }
    });
  };
};

export const deleteBox = () => {
  return (dispatch, getState) => {
    DeleteBox("seed");
    return dispatch(boxFlag(false));
  };
};

// Actions
export function boxFlag(box) {
  return {
    type: types.BOX_FLAG,
    box
  };
}

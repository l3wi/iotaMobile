import * as types from "./types";
import { Alert } from "react-native";
import {
  RetrieveBox,
  DeleteBox,
  OpenBox,
  hashPwd,
  stringToU8
} from "../libs/crypto";

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

export const showSeed = pwd => {
  return async (dispatch, getState) => {
    var seed = await OpenBox("seed", hashPwd(pwd));
    if (!seed) return Alert.alert("Error", "Incorrect Password");
    Alert.alert("Wallet Seed:", seed);
  };
};

export const clearPwd = () => {
  return (dispatch, getState) => {
    dispatch(setPwd(stringToU8("000000000000000000000000")));
  };
};

export function setPwd(pwd) {
  return {
    type: types.SET_PWD,
    pwd
  };
}

export function setRemember(remember) {
  return {
    type: types.SET_REMEMBER,
    remember
  };
}
export const deleteBox = () => {
  return (dispatch, getState) => {
    DeleteBox("seed");
  };
};

export function boxFlag(box) {
  return {
    type: types.BOX_FLAG,
    box
  };
}

import * as types from "./types";
import IOTA from "iota.lib.js";
import { AsyncStorage } from "react-native";
import {
  OpenBox,
  SaveBox,
  DeleteBox,
  hashPwd,
  stringToU8,
  uintToS
} from "../libs/crypto";

var defaultNode = "http://node.iotawallet.info:14265/";

var iota = new IOTA({
  provider: defaultNode
});

export const getAccount = pwd => {
  return async (dispatch, getState) => {
    var clearSeed = await OpenBox("seed", pwd);
    console.log(clearSeed);
    iota.api.getAccountData(iota.utils.toTrytes(clearSeed), function(
      error,
      success
    ) {
      if (error) {
        alert(error);
      } else {
        dispatch(setAccount(success));
      }
    });
  };
};

export function startLoading(data) {
  return {
    type: types.LOADING,
    data
  };
}

export function finishLoading() {
  return {
    type: types.LOADING
  };
}
export function setAccount(account) {
  return {
    type: types.SET_ACCOUNT,
    account
  };
}
export function setPwd(pwd) {
  return {
    type: types.SET_PWD,
    pwd
  };
}

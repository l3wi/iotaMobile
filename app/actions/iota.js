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

export const getNode = pwd => {
  return async (dispatch, getState) => {
    dispatch(startLoading("Getting Node"));
    await iota.api.getNodeInfo(function(error, success) {
      if (error) {
        return alert(error);
      } else {
        dispatch(setNodeInfo(success));
        return dispatch(finishLoading());
      }
    });
  };
};

export const getAccount = (pwd, navigator) => {
  return async (dispatch, getState) => {
    dispatch(startLoading("Getting Wallet"));
    await iota.api.getAccountData(
      await iota.utils.toTrytes(await OpenBox("seed", pwd)),
      function(error, success) {
        if (error) {
          alert(error);
          return dispatch(finishLoading());
        } else {
          dispatch(setAccount(success));
          if (navigator) {
            navigator.resetTo({ screen: "transactions" });
          }
          return dispatch(finishLoading());
        }
      }
    );
  };
};
export const newAddress = pwd => {
  return async (dispatch, getState) => {
    dispatch(startLoading("Genterating New Address"));

    var clearSeed = await OpenBox("seed", pwd);
    iota.api.getNewAddress(iota.utils.toTrytes(clearSeed), function(
      error,
      success
    ) {
      if (error) {
        alert(error);
      } else {
        dispatch(setAddress(success));
        dispatch(finishLoading());
      }
    });
  };
};

export const sendTransaction = (pwd, depth, minMag, transfers) => {
  return async (dispatch, getState) => {
    dispatch(startLoading("Sending to Tangle"));
    var clearSeed = await OpenBox("seed", pwd);
    iota.api.sendTransfer(
      iota.utils.toTrytes(clearSeed),
      depth,
      minMag,
      transfers,
      function(error, success) {
        dispatch(finishLoading());
        if (error) {
          alert(error);
        }
      }
    );
  };
};

export const reattachTransaction = (depth, minMag, hash) => {
  return async (dispatch, getState) => {
    iota.api.replayBundle(depth, minMag, hash, function(error, success) {
      dispatch(finishLoading());
      if (error) {
        alert(error);
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

export function setNodeInfo(node) {
  return {
    type: types.SET_NODE,
    node
  };
}
export function setAccount(account) {
  return {
    type: types.SET_ACCOUNT,
    account
  };
}

export function setAddress(address) {
  return {
    type: types.SET_ADDRESS,
    address
  };
}
export function setPwd(pwd) {
  return {
    type: types.SET_PWD,
    pwd
  };
}

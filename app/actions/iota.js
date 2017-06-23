import * as types from "./types";
import { iota } from "../libs/iota";
import { AsyncStorage, Alert } from "react-native";
import {
  OpenBox,
  SaveBox,
  DeleteBox,
  hashPwd,
  stringToU8,
  uintToS
} from "../libs/crypto";

// Initialises the node
export const setupNode = nodeFromStore => {
  return async (dispatch, getState) => {
    if (nodeFromStore) {
      dispatch(changeNode(nodeFromStore));
    } else {
      dispatch(changeNode("http://node.iotawallet.info:14265/"));
    }
  };
};

// Allows you to change the node
export const changeNode = (remote, user) => {
  return async (dispatch, getState) => {
    iota.changeNode({ provider: remote });
    dispatch(saveRemoteNode(remote));
    if (user) Alert.alert("Node Changed");
  };
};

// Get the node info for display
export const getNode = pwd => {
  return async (dispatch, getState) => {
    dispatch(startLoading("Getting Node"));
    await iota.api.getNodeInfo(function(error, success) {
      if (error) {
        Alert.alert(error);
        return dispatch(finishLoading());
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
          Alert.alert(error);
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
        Alert.alert(error);
        dispatch(finishLoading());
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

export function hydrate(data) {
  return {
    type: types.HYDRATE,
    data
  };
}

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

export function saveRemoteNode(node) {
  return {
    type: types.SET_REMOTE,
    node
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

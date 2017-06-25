import * as types from "./types";
import { iota } from "../libs/iota";
import { purgeStoredState } from "redux-persist";
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
    if (user) Alert.alert("Node Changed to" + remote);
  };
};

// Get the node info for display
export const getNode = pwd => {
  return async (dispatch, getState) => {
    dispatch(startLoading("Connecting to Node ..."));
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
    dispatch(startLoading("Getting your Wallet ..."));
    await iota.api.getAccountData(await OpenBox("seed", pwd), function(
      error,
      success
    ) {
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
    });
  };
};
export const newAddress = pwd => {
  return async (dispatch, getState) => {
    dispatch(startLoading("Generating new Address ..."));
    iota.api.getNewAddress(await OpenBox("seed", pwd), function(
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
    dispatch(startLoading("Attaching to Tangle ..."));
    iota.api.sendTransfer(
      await OpenBox("seed", pwd),
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

export const resetAsync = navigator => {
  return async (dispatch, getState) => {
    dispatch(clearIota());
    purgeStoredState({ storage: AsyncStorage }, [])
      .then(() => {
        console.log("purge of someReducer completed");
        DeleteBox("seed");
        navigator.resetTo({
          screen: "auth"
        });
        Alert.alert("Seed & Local data was destroyed");
      })
      .catch(() => {
        console.log("purge of someReducer failed");
      });
  };
};

export function clearIota(data) {
  return {
    type: types.CLEAR_IOTA,
    data
  };
}

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

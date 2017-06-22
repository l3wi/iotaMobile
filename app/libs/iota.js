import IOTA from "iota.lib.js";
import { AsyncStorage } from "react-native";

var defaultNode = "http://node.iotawallet.info:14265/";

export var iota = new IOTA({
  provider: defaultNode
});

(async () => {
  console.log("Initialising IOTA lib");
  try {
    await AsyncStorage.getItem("node", (err, result) => {
      if (result) {
        console.log(result);
        iota = new IOTA({
          provider: JSON.parse(result)
        });
      } else {
        console.log("Using default node");
        iota = new IOTA({
          provider: defaultNode
        });
      }
    });
  } catch (error) {
    // Error saving data
  }
})();

export const getNode = async () => {
  var node = defaultNode;
  await AsyncStorage.getItem("node", (err, result) => {
    const remotenode = JSON.parse(result);
    if (node) {
      node = remotenode;
    }
  });
  return node;
};
export const changeRemoteNode = async url => {
  console.log("Setting remote node to: " + url);
  iota = new IOTA({
    provider: url
  });
  try {
    await AsyncStorage.setItem("node", JSON.stringify(url));
  } catch (error) {
    // Error saving data
  }
  alert("Node Changed");
};

export class iotaWrapper {
  static toTrytes = data => {
    return iota.utils.toTrytes(data);
  };

  static addChecksum = address => {
    return iota.utils.addChecksum(address);
  };

  static removeChecksum = address => {
    return iota.utils.noChecksum(address);
  };
}

export class Valid {
  static isAddress = data => {
    return iota.valid.isAddress(data);
  };

  static isTrytes = data => {
    return iota.valid.isTrytes(data);
  };
}

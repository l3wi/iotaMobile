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

export default class iotaWrapper {
  static node = () => {
    var p = new Promise((res, rej) => {
      iota.api.getNodeInfo(function(error, success) {
        if (error) {
          alert(error);
          rej(error);
        } else {
          console.log(success);
          res(success);
        }
      });
    });
    return p;
  };

  static getAccount = seed => {
    console.log("Getting Account");
    var p = new Promise((res, rej) => {
      iota.api.getAccountData(iotaWrapper.toTrytes(seed), function(
        error,
        success
      ) {
        if (error) {
          alert(error);
          rej(error);
        } else {
          console.log(success);
          res(success);
        }
      });
    });
    return p;
  };

  static getTransfers = seed => {
    console.log("Getting Transfers");
    var p = new Promise((res, rej) => {
      iota.api.getTransfers(iotaWrapper.toTrytes(seed), function(
        error,
        success
      ) {
        if (error) {
          alert(error);
          rej(error);
        } else {
          console.log(success);
          res(success);
        }
      });
    });
    return p;
  };
  static newAddress = seed => {
    console.log("Generating New Address");
    var p = new Promise((res, rej) => {
      iota.api.getNewAddress(
        iotaWrapper.toTrytes(seed),
        { checksum: true },
        function(error, success) {
          if (error) {
            alert(error);
            rej(error);
          } else {
            console.log(success);
            res(success);
          }
        }
      );
    });

    return p;
  };

  static send = (seed, depth, minMag, transfers, inputs) => {
    console.log("Sending Transaction");
    var p = new Promise((res, rej) => {
      iota.api.sendTransfer(
        iotaWrapper.toTrytes(seed),
        depth,
        minMag,
        transfers,
        { inputs: inputs },
        function(error, success) {
          if (error) {
            alert(error);
            rej(error);
          } else {
            res(success);
          }
        }
      );
    });
    return p;
  };

  static replay = (depth, minMag, hash) => {
    console.log("Replaying Transaction");
    var p = new Promise((res, rej) => {
      iota.api.replayBundle(depth, minMag, hash, function(error, success) {
        if (error) {
          alert(error);
          rej(error);
        } else {
          res(success);
        }
      });
    });
    return p;
  };

  static toTrytes = data => {
    return iota.utils.toTrytes(data);
  };

  static categorizeTransfers = (transfers, addresses) => {
    return iota.utils.categorizeTransfers(transfers, addresses);
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

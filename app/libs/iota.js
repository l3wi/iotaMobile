import IOTA from "iota.lib.js";

const iota = new IOTA({
  provider: "http://node.iotawallet.info:14265/"
});

export default class iotaWrapper {
  static node = () => {
    var p = new Promise((res, rej) => {
      iota.api.getNodeInfo(function(error, success) {
        if (error) {
          console.error(error);
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
          console.error(error);
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
            console.error(error);
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

  static send = (seed, depth, minMag, transfers) => {
    console.log("Sending Transaction");
    var p = new Promise((res, rej) => {
      iota.api.sendTransfer(seed, depth, minMag, transfers, function(
        error,
        success
      ) {
        if (error) {
          console.error(error);
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
}

export class Valid {
  static isAddress = data => {
    return iota.valid.isAddress(data);
  };

  static isTrytes = data => {
    return iota.valid.isTrytes(data);
  };
}

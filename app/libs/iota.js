import IOTA from "iota.lib.js";

const iota = new IOTA({
  provider: "http://node.iotawallet.info:14265/"
});

export default class iotaWrapper {
  static node = () => {
    iota.api.getNodeInfo(function(error, success) {
      if (error) {
        console.error(error);
      } else {
        console.log(success);
      }
    });
  };

  static getAccount = async seed => {
    console.log("Getting Account");
    iota.api.getAccountData(iotaWrapper.toTrytes(seed), function(
      error,
      success
    ) {
      if (error) {
        console.error(error);
      } else {
        console.log(success);
        iotaWrapper.newAddress(seed);
        return success;
      }
    });
  };

  static newAddress = seed => {
    console.log("Generating New Address");
    iota.api.getNewAddress(
      iotaWrapper.toTrytes(seed),
      { checksum: true },
      function(error, success) {
        if (error) {
          console.error(error);
        } else {
          console.log(success);
          var transfers = [
            {
              address: success,
              value: 0,
              tag: iotaWrapper.toTrytes("iOSWALLET")
            }
          ];
          iotaWrapper.send(seed, 6, 18, transfers);
        }
      }
    );
  };

  static send = (seed, depth, minMag, transfers) => {
    console.log("Sending Transaction");
    iota.api.sendTransfer(seed, depth, minMag, transfers, function(
      error,
      success
    ) {
      if (error) {
        console.error(error);
      } else {
        console.log(success);
      }
    });
  };

  static toTrytes = data => {
    return iota.utils.toTrytes(data);
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

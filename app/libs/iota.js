import IOTA from "iota.lib.js";

const iota = new IOTA({
  provider: "http://service.iotasupport.com:14265"
});

export default class iotaWrapper {
  static node = () => {
    iota.api.getNodeInfo(function(event) {
      console.log(event);
      return event;
    });
  };

  static getAccount = seed => {
    console.log(seed);
    iota.api.getAccountData(iotaWrapper.toTrytes(seed), function(event) {
      console.log(event);
      return;
    });
  };

  static newAddress = seed => {
    iota.api.getAccountData(iotaWrapper.toTrytes(seed), function(event) {
      console.log(event);
      return;
    });
  };

  static toTrytes = data => {
    console.log(data);
    console.log(iota.utils.toTrytes(data));
    return iota.utils.toTrytes(data);
  };
}

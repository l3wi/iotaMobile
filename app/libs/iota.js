import IOTA from "iota.lib.js";

var defaultNode = "http://node.iotawallet.info:14265/";

export var iota = new IOTA({
  provider: defaultNode
});

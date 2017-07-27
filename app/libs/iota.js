import IOTA from "iota.lib.js";

var defaultNode = "https://node.tangle.works";

export var iota = new IOTA({
  provider: defaultNode
});

import IOTA from "iota.lib.js";

const iota = new IOTA({
  provider: "http://localhost:14265"
});

const iotaWrapper = props => {
  this.provider = props.provider;
};

console.log(
  iota.api.getNodeInfo(function(error, success) {
    if (error) {
      console.error(error);
    } else {
      console.log(success);
    }
  })
);

console.log(iota.version);

export default props => iotaWrapper;

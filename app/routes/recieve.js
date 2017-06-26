import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Clipboard,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import qr from "yaqrcode";
import { iota } from "../libs/iota";
import Balance from "../components/balance";

copy = address => {
  Clipboard.setString(address);
  alert("Address has been copied to clip board");
};

class RecieveScreen extends Component {
  state = {
    called: false
  };
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.type == "DeepLink") {
      this.props.navigator.resetTo({
        screen: event.link,
        animated: false
      });
      this.props.navigator.toggleDrawer({
        side: "left",
        to: "close"
      });
    }
  }
  static navigatorStyle = {
    navBarHidden: true // make the nav bar hidden
  };

  newAddress = pwd => {
    this.setState({ called: true });
    this.props.newAddress(pwd);
  };

  attach = () => {
    this.setState({ called: false });
    this.props.sendTransaction(this.props.pwd, 6, 15, [
      {
        address: this.props.account.addresses[
          this.props.account.addresses.length - 1
        ],
        value: 0,
        tag: iota.utils.toTrytes("iOSWALLET")
      }
    ]);
  };

  static navigationOptions = {};
  render() {
    var { called } = this.state;
    var { account, loading } = this.props;
    return (
      <Wrapper>
        <Balance
          title={"Receive Page"}
          account={account}
          loading={loading}
          {...this.props}
        />
        <ScrollView style={{ width: "100%" }}>
          {/*Wait for account to load*/}
          {account.latestAddress
            ? <Col>
                {/*If you dont have any addresses show attach button*/}
                {account.addresses[account.addresses.length - 1]
                  ? <Col>
                      <CopyAddress
                        onPress={() =>
                          copy(
                            iota.utils.addChecksum(
                              account.addresses[account.addresses.length - 1]
                            )
                          )}
                      >
                        <Address>
                          {iota.utils.addChecksum(
                            account.addresses[account.addresses.length - 1]
                          )}
                        </Address>
                      </CopyAddress>
                      {account.addresses[account.addresses.length - 1]
                        ? <QR
                            source={{
                              uri: qr(
                                iota.utils.addChecksum(
                                  account.addresses[
                                    account.addresses.length - 1
                                  ]
                                )
                              ),
                              scale: 4
                            }}
                          />
                        : null}

                    </Col>
                  : null}

                {!account.addresses[0]
                  ? <Text style={{ marginTop: 20 }}>
                      Click below to generate your first Address
                    </Text>
                  : null}

                {!called
                  ? <Button
                      loading={loading}
                      onPress={() =>
                        !loading ? this.newAddress(this.props.pwd) : null}
                    >
                      <WhiteText>Generate new Address</WhiteText>
                    </Button>
                  : <Button
                      loading={loading}
                      onPress={() => (!loading ? this.attach() : null)}
                    >
                      <WhiteText>Attach to Tangle</WhiteText>
                    </Button>}

              </Col>
            : null}

        </ScrollView>

      </Wrapper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    account: state.iota.account,
    pwd: state.crypto.pwd,
    loading: state.iota.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecieveScreen);

const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;
const Col = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Button = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    margin: 20px 0px 0 0 ;
    background-color: ${props => (props.loading ? "#9ea2a2" : "#2d353e")};
    width: 80%;
`;

const CopyAddress = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    margin: 20px 0px;
    background-color: #eee;
    width: 80%;
`;
const WhiteText = styled.Text`
  color: white;
`;
const Address = styled.Text`
  text-align: center;
`;

const QR = styled.Image`
  height: 320px;
  width: 320px;
`;

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
import Iota from "../libs/iota";
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

  newAddress = () => {
    this.setState({ called: true });
    this.props.screenProps.newAddress();
  };

  attach = () => {
    this.setState({ called: false });
    this.props.sendTransaction(this.props.pwd, 6, 15, [
      {
        address: this.props.account.addresses[
          this.props.account.addresses.length - 1
        ],
        value: 0,
        tag: Iota.toTrytes("iOSWALLET")
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
          title={"Receive"}
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
                            Iota.addChecksum(
                              account.addresses[account.addresses.length - 1]
                            )
                          )}
                      >
                        <Address>
                          {Iota.addChecksum(
                            account.addresses[account.addresses.length - 1]
                          )}
                        </Address>
                      </CopyAddress>
                      {account.addresses[account.addresses.length - 1]
                        ? <QR
                            source={{
                              uri: qr(
                                Iota.addChecksum(
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
                      Click below to generate your first address
                    </Text>
                  : null}

                {!called &&
                  account.addresses[account.addresses.length - 1] !==
                    account.latestAddress
                  ? <Button
                      onPress={() => this.props.newAddress(this.props.pwd)}
                    >
                      <WhiteText>New Address</WhiteText>
                    </Button>
                  : <Button onPress={() => this.attach()}>
                      <WhiteText>Attach to tangle</WhiteText>
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
    pwd: state.iota.pwd,
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
    background-color: #2d353e;
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

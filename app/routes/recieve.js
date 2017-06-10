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
import qr from "yaqrcode";
import Iota from "../libs/iota";
import Balance from "../components/balance";

copy = address => {
  Clipboard.setString(address);
  alert("Address has been copied to clip board");
};

export default class RecieveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      called: false
    };
  }

  componentWillUnmount() {
    this.setState({ called: false });
  }

  callNewAddress = () => {
    this.props.screenProps.newAddress;
    this.setState({ called: true });
  };

  static navigationOptions = {};
  render() {
    var { account } = this.props.screenProps.state;
    var { called } = this.state;
    return (
      <Wrapper>
        <Balance account={account} {...this.props} />
        <ScrollView style={{ width: "100%" }}>
          <Col>
            <CopyAddress onPress={() => copy(account.latestAddress)}>
              <Text>{account.latestAddress}</Text>
            </CopyAddress>
            <QR source={{ uri: qr(account.latestAddress), scale: 2 }} />

            {account.transfers[account.transfers.length - 1] ===
              account.latestAddress
              ? <Button onPress={this.callNewAddress}>
                  <WhiteText>New Address</WhiteText>
                </Button>
              : <Button onPress={this.props.screenProps.attachToTangle}>
                  <WhiteText>Attach to tangle</WhiteText>
                </Button>}

          </Col>

        </ScrollView>

      </Wrapper>
    );
  }
}
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
    background-color: rgba(255,255,255,.4);
    width: 80%;
`;
const WhiteText = styled.Text`
  color: white;
`;
const QR = styled.Image`
  height: 320px;
  width: 320px;
`;

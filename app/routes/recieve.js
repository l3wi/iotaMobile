import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Clipboard,
  TouchableOpacity
} from "react-native";
import qr from "yaqrcode";

import Balance from "../components/balance";

copy = address => {
  Clipboard.setString(address);
  alert("Address has been copied to clip board");
};

export default class RecieveScreen extends Component {
  static navigationOptions = {};
  render() {
    console.log(this.props);
    var { account } = this.props.screenProps.state;
    return (
      <Wrapper>
        <Balance account={account} {...this.props} />
        <CopyAddress onPress={() => copy(account.latestAddress)}>
          <Text>{account.latestAddress}</Text>
        </CopyAddress>
        <QR source={{ uri: qr(account.latestAddress), scale: 2 }} />
        <Button onPress={this.props.screenProps.newAddress}>
          <WhiteText>New Address</WhiteText>
        </Button>

        <Button onPress={this.props.screenProps.send}>
          <WhiteText>Attach to tangle</WhiteText>
        </Button>
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
const Button = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    margin: 20px 0px 0 0 ;
    background-color: #004f71;
    width: 80%;
`;

const CopyAddress = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    margin: 20px 0px;
    background-color: rgba(255,255,255,.3);
    width: 80%;
`;
const WhiteText = styled.Text`
  color: white;
`;
const QR = styled.Image`
  height: 320px;
  width: 320px;
`;

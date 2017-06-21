import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

class MenuScreen extends Component {
  static navigationOptions = {};
  render() {
    return (
      <Wrapper>
        <MenuButton>
          <MenuText>IOTA Wallet</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.push({
              screen: "transactions"
            })}
        >
          <MenuText>Transactions</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.push({
              screen: "receive"
            })}
        >
          <MenuText>Receive</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.push({
              screen: "send"
            })}
        >
          <MenuText>Send</MenuText>
        </MenuButton>
        <MenuButton
          onPress={() =>
            this.props.navigator.push({
              screen: "settings"
            })}
        >
          <MenuText>Settings</MenuText>
        </MenuButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;

const MenuButton = styled.TouchableOpacity`
    height: 7%;
    width:100%;
    background: #2d353e;
    display:flex;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #eee;
`;

const MenuText = styled.Text`
    color: white;

`;

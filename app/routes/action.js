import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Vibration
} from "react-native";
import { Navigation } from "react-native-navigation";

import Camera from "react-native-camera";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Send from "../components/send";

class ActionScreen extends Component {
  state = {
    allowed: false
  };
  static navigatorStyle = {
    screenBackgroundColor: "transparent",
    modalPresentationStyle: "overCurrentContext",
    navBarHidden: true // make the nav bar hidden
  };

  componentDidMount() {}

  render() {
    var { allowed } = this.state;
    return (
      <View>
        <Close
          onPress={() =>
            this.props.navigator.dismissModal({
              animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            })}
        />
        <Wrapper>
          <Menu>
            <MenuButton>
              <MenuText>Receive</MenuText>
            </MenuButton>
            <MenuButton>
              <MenuText active>Send</MenuText>
            </MenuButton>
          </Menu>
          <Send />
        </Wrapper>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActionScreen);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Close = styled.TouchableOpacity`height: ${height * 0.1 + "px"};`;

const Wrapper = styled.View`
  height: 90%;
  width: 100%;
  display: flex;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const Row = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Menu = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-color: #f0f2f5;
  border-bottom-width: 1px;
`;

const MenuButton = styled.TouchableOpacity`padding: 20px 40px;`;

const MenuText = styled.Text`
  font-size: 16px;
  color: ${props => (props.active ? "#295fcc" : "#CBD2E3")};
`;

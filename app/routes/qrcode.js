import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Navigation } from "react-native-navigation";

import Camera from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

class QRScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true // make the nav bar hidden
  };
  render() {
    return (
      <Wrapper>
        <Close onPress={() => this.props.dismiss()}>
          <Image
            source={require("../assets/close.png")}
            style={{ height: 30, width: 30 }}
          />
        </Close>
        <QRCodeScanner onRead={data => this.props.function(data)} />
        {/*<Camera
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={data => console.log(data)}
        />*/}
      </Wrapper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScreen);

const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    background: #2d353e;
    align-items: center;
    justify-content: flex-start;
`;

const Close = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 10;
`;

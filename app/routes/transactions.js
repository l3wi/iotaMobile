import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Balance from "../components/balance";
import Transactions from "../components/transactions";
import Button from "../components/listButton";

class TransactionsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.type == "DeepLink") {
      this.props.navigator.resetTo({
        screen: event.link,
        animationType: "fade",
        animated: true
      });
      this.props.navigator.toggleDrawer({
        side: "left",
        to: "close"
      });
    }
  }

  static navigatorStyle = {
    screenBackgroundColor: "#2d353e",
    navBarHidden: true // make the nav bar hidden
  };

  componentWillMount() {
    this.props.navigator.setDrawerEnabled({
      side: "left", // the side of the drawer since you can have two, 'left' / 'right'
      enabled: true // should the drawer be enabled or disabled (locked closed)
    });
  }

  refresh = () => {
    if (!this.props.loading) {
      this.props.getAccount(this.props.pwd);
    }
  };

  action = () => {
    console.log("Loading action");
    this.props.navigator.showModal({
      screen: "action", // unique ID registered with Navigation.registerScreen
      animationType: "slide-up" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  render() {
    return (
      <Wrapper>
        <Balance
          title={"Transactions"}
          account={this.props.account}
          loading={this.props.loading}
          {...this.props}
        />
        <Transactions
          account={this.props.account}
          loading={this.props.loading}
          refresh={this.refresh}
          {...this.props}
        />
        <Fab onPress={this.action}>
          <Image
            source={require("../assets/up_arrow.png")}
            style={{ height: 20, width: 20 }}
          />
        </Fab>
      </Wrapper>
    );
  }
}
const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Fab = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-width: 2px;
  border-color: #d3d8e8;
  border-radius: 30px;
  background-color: white;
  position: absolute;
  bottom: 20;
  right: 30;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);

import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  AlertIOS
} from "react-native";
import styled from "styled-components/native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import { OpenBox, DeleteBox, hashPwd } from "../libs/crypto";
import { getRemember, setRemember } from "../libs/remember";
import Balance from "../components/balance";
import ItemButton from "../components/listButton";

class InitialScreen extends Component {
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
  state = {
    loading: true,
    box: false,
    rememberMe: null,
    remoteNode: ""
  };
  static navigatorStyle = {
    screenBackgroundColor: "#2d353e",
    navBarHidden: true // make the nav bar hidden
  };

  componentWillMount() {}
  // Gets node to display in the page (Could be paassed down)
  findNode = async () => {
    this.props.getNode();
  };

  findRemember = async () => {
    const time = await getRemember();
    this.setState({ rememberMe: time });
  };

  // Clears the application
  clear = () => {
    this.props.resetAsync(this.props.navigator);
  };

  prompt = (header, body, func, type, prefill, keyboard) => {
    AlertIOS.prompt(header, body, data => func(data), type, prefill, keyboard);
  };

  render() {
    var { account, loading, remoteNode, rememberMe } = this.props;
    return (
      <Wrapper>
        <Balance
          title={"Settings Page"}
          account={account}
          loading={loading}
          {...this.props}
        />
        <ScrollView
          style={{ width: "100%", height: "80%" }}
          contentContainerStyle={{
            justifyContent: "space-between",
            backgroundColor: "#eee"
          }}
        >
          <ItemButton
            between
            func={() =>
              this.prompt(
                "Logout Timer",
                "Set time in minutes e.g. 25",
                this.props.setRemember,
                "plain-text",
                "",
                "number-pad"
              )}
          >
            <Text>Time to automatic logout: </Text>
            {rememberMe !== "0"
              ? <Text>{rememberMe} Min</Text>
              : <Text>Disabled</Text>}
          </ItemButton>

          <ItemButton
            between
            func={() =>
              this.prompt(
                "Enter custom node URL",
                "Please enter host address with port. \n \n e.g. http://node.iotawallet.info:14265",
                text => this.props.changeNode(text),
                "plain-text",
                "http://",
                "url"
              )}
          >
            <Text>Remote-Node: </Text>
            <Text>{remoteNode}</Text>
          </ItemButton>

          <ItemButton
            between
            func={() =>
              this.prompt(
                "Enter your password to get access to your Seed",
                null,
                text => this.props.showSeed(text),
                "secure-text"
              )}
          >
            <Text>Display your current Seed</Text>
          </ItemButton>
          <ItemButton
            between
            func={() =>
              Alert.alert(
                "Reset Wallet",
                "You are about to delete your SEED and clear the wallet. \n \n Are you sure you want to do this?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("User Canceled")
                  },

                  {
                    text: "Clear Seed",
                    onPress: () => this.clear(),
                    style: "destructive"
                  }
                ],
                { cancelable: false }
              )}
          >
            <Text>Delete Seed & Reset Wallet</Text>
          </ItemButton>

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
    rememberMe: state.crypto.remember,
    remoteNode: state.iota.nodeUrl,
    loading: state.iota.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);

const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    backgroundColor: white;
    align-items: center;
    justify-content: flex-start;
`;

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
import { changeRemoteNode, getNode } from "../libs/iota";
import { getRemember, setRemember } from "../libs/remember";
import Balance from "../components/balance";
import { NavigationActions } from "react-navigation";

class InitialScreen extends Component {
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
  state = {
    loading: true,
    box: false,
    rememberMe: null,
    remoteNode: ""
  };
  static navigatorStyle = {
    navBarHidden: true // make the nav bar hidden
  };

  componentWillMount() {
    this.findNode();
    this.findRemember();
  }
  // Gets node to display in the page (Could be paassed down)
  findNode = async () => {
    const node = await getNode();
    this.setState({ remoteNode: node });
  };

  findRemember = async () => {
    const time = await getRemember();
    this.setState({ rememberMe: time });
  };

  // Clears the application
  clear = () => {
    DeleteBox("seed");
    this.props.navigator.resetTo({
      screen: "auth"
    });
    Alert.alert("Seed was cleared");
  };

  render() {
    var { account, loading } = this.props;
    var { remoteNode, rememberMe } = this.state;
    return (
      <Wrapper>
        <Balance
          title={"Settings"}
          account={account}
          loading={loading}
          {...this.props}
        />
        <ScrollView
          style={{ width: "100%", height: "80%" }}
          contentContainerStyle={{ justifyContent: "space-between" }}
        >
          <EmptyCol>
            <Row between>
              <Text>Remember me timeout: </Text>
              <Text>{rememberMe} Min</Text>
            </Row>

            <Row between>
              <Text>Remote Node: </Text>
              <Text>{remoteNode}</Text>
            </Row>
            <Row>
              <Button
                onPress={() => {
                  AlertIOS.prompt(
                    "Enter timeout in minutes:",
                    null,
                    text => setRemember(text) && this.findRemember(),
                    "plain-text",
                    "",
                    "number-pad"
                  );
                }}
              >
                <WhiteText>Set Remember Me Timeout</WhiteText>
              </Button>
            </Row>
            <Row>
              <Button
                onPress={() => {
                  AlertIOS.prompt(
                    "Enter node url",
                    null,
                    text => changeRemoteNode(text) && this.findNode(),
                    "plain-text",
                    "http://",
                    "url"
                  );
                }}
              >
                <WhiteText>Change remote node</WhiteText>
              </Button>
            </Row>
            <Row>
              <Button
                onPress={() => {
                  AlertIOS.prompt(
                    "Enter a password",
                    null,
                    text => this.props.showSeed(text),
                    "secure-text"
                  );
                }}
              >
                <WhiteText>Show Seed</WhiteText>
              </Button>
            </Row>
          </EmptyCol>

          <Spacer />
          <Row>
            <Button onPress={() => this.clear()}>
              <WhiteText>Delete Seed & Reset Wallet</WhiteText>
            </Button>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);

const Wrapper = styled.View`
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: flex-start;
`;
const EmptyCol = styled.View`
    flex:1;
    flex-direction: column;
    width: 100%;
`;
const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: ${props => (props.between ? "space-between" : "center")};
    align-items: center;
    margin: 20px 20px ;
`;

const BottomBorder = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    border-bottom-color: #2d353e;
    margin-right: 30px;
`;
const TInput = styled.TextInput`
    height: 40px;
    color: #2d353e;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: #2d353e;    
`;
const AppText = styled.Text`
  padding: 30px 0px;
  font-size: 20px;
    color: white;
`;
const Button = styled.TouchableOpacity`
    align-items: center;
    padding: 10px;
    background-color: #2d353e;
    flex: ${props => (props.wide ? 1.8 : 1)};

`;
const WhiteText = styled.Text`
  color: white;
`;

const Spacer = styled.View`
  height: 50px;
`;

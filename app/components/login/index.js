import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from "react-native";
import Iota, { Valid } from "../../libs/iota";
import { OpenBox, SaveBox, DeleteBox, hashPwd } from "../../libs/crypto";
import { NavigationActions } from "react-navigation";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pass: "" };
  }

  nextRoute = (account, pass, node) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Main",
          params: { account: account, pwd: pass, node: node }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  getAccount = async password => {
    const passHash = hashPwd(password);
    this.props.loading("Getting Node");
    const node = await Iota.node();
    // Decrypt Seed
    const clearSeed = await OpenBox("seed", passHash);
    this.setState({ pass: "" });
    if (!clearSeed) return alert("Incorrect Password");
    // Get account
    this.props.loading("Getting Wallet");
    const account = await Iota.getAccount(clearSeed);
    if (!account) return alert("Couldn't fetch wallet");
    // this.setState({ account });
    // Push to new page
    this.nextRoute(account, passHash, node);
  };

  render() {
    return (
      <Col>
        <Logo source={require("../../assets/iota.png")} />

        <EmptyCol>

          <Row>
            <BottomBorder>
              <TInput
                value={this.state.pass}
                placeholder={"Enter Password"}
                autoCorrect={false}
                secureTextEntry={true}
                placeholderTextColor={"white"}
                selectTextOnFocus={true}
                onSubmitEditing={() => this.getAccount(this.state.pass)}
                onChangeText={pass => this.setState({ pass })}
              />
            </BottomBorder>
          </Row>
          <Row>
            <Button onPress={() => this.getAccount(this.state.pass)}>
              <AppText>Login</AppText>
            </Button>
          </Row>
        </EmptyCol>
        <Row>
          <Button onPress={this.props.clear}>
            <AppText>Load New Wallet</AppText>
          </Button>
        </Row>
      </Col>
    );
  }
}

const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
`;
const Col = styled.View`
    display: flex;
    height:100%;
    width:80%;
    flex-direction: column;   
    justify-content: space-around;
    align-items: center;
`;

const Logo = styled.Image`
  width: 160px;
  height:160px;
`;

const EmptyCol = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const BottomBorder = styled.View`
    flex: 1;
    border-bottom-width: 3px;
  border-bottom-color: white;

`;
const TInput = styled.TextInput`
    height: 40px;
    color: white;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const AppText = styled.Text`
    color: white;
`;

const Button = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin: 20px 0;
    background-color: rgba(255,255,255,.3);
`;

import React from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, TextInput } from "react-native";
import Iota, { Valid } from "../../libs/iota";
import { OpenBox, SaveBox, DeleteBox } from "../../libs/crypto";
import { NavigationActions } from "react-navigation";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pass: "" };
  }

  resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Main" })]
  });

  getAccount = async (seed, password) => {
    const clearSeed = await OpenBox("seed", password);
    this.setState({ pass: "" });
    if (!clearSeed) return alert("Incorrect Password");
    Iota.getAccount(clearSeed).then(box => {
      this.props.navigation.dispatch(this.resetAction);
    });
  };
  render() {
    return (
      <Col>
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
                onChangeText={pass => this.setState({ pass })}
              />
            </BottomBorder>
          </Row>
          <Row>
            <Button
              onPress={() => this.getAccount(this.state.pass, this.state.pass)}
            >
              <AppText>Login</AppText>
            </Button>
          </Row>
        </EmptyCol>

        <Button onPress={() => DeleteBox("seed")}>
          <AppText>Load New Wallet</AppText>
        </Button>
      </Col>
    );
  }
}

const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`;
const Col = styled.View`
    display: flex;
    height:80%;
    width:80%;
    flex-direction: column;   
    justify-content: space-around;
    align-items: center;
`;
const EmptyCol = styled.View`
    display: flex;
    flex-direction: column;
`;
const BottomBorder = styled.View`
    width: 100%;
    border-bottom-width: 3px;
      border-bottom-color: white;
`;
const TInput = styled.TextInput`
    height: 40px;
    width: 100%;
    color: white;
    font-family: courier;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const AppText = styled.Text`
    color: white;
    font-family: courier;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    margin-left: 10px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

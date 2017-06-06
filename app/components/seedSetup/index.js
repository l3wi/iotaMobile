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

import Iota from "../../libs/iota";
import { InitialiseSeed, OpenBox, randSeed } from "../../libs/crypto";
import { NavigationActions } from "react-navigation";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seed: "", first: "", second: "" };
  }

  resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Main" })]
  });

  setup = async (seed, password) => {
    if (this.state.first === this.state.second) {
      console.log("Initialising Seed");
      await InitialiseSeed(seed, password);
      const clearSeed = await OpenBox("seed", password);
      Iota.getAccount(clearSeed);
      this.setState({ seed: "", first: "", second: "" });
      this.props.navigation.dispatch(this.resetAction);
    } else {
      alert("Your passwords didn't match");
      this.setState({ first: "", second: "" });
    }
  };

  render() {
    return (
      <Col>
        <EmptyCol>
          <Row>
            <BottomBorder full>
              <TInput
                value={this.state.seed}
                autoCorrect={false}
                placeholder={"Enter Seed"}
                placeholderTextColor={"white"}
                selectTextOnFocus={true}
                onChangeText={seed => this.setState({ seed })}
              />
            </BottomBorder>
            {/*<Button onPress={() => console.log("Get Camera")}>
              <ImageButton source={require("../../assets/scan.png")} />
            </Button>*/}
          </Row>
          <Button onPress={() => this.setState({ seed: randSeed(81) })}>
            <AppText>Click to generate a seed</AppText>
          </Button>
        </EmptyCol>
        <EmptyCol>
          <Row>
            <BottomBorder full>
              <TInput
                value={this.state.first}
                autoCorrect={false}
                placeholder={"Enter Password"}
                placeholderTextColor={"white"}
                secureTextEntry={true}
                onChangeText={first => this.setState({ first })}
              />
            </BottomBorder>
          </Row>

          <Row>
            <BottomBorder full>
              <TInput
                value={this.state.second}
                autoCorrect={false}
                placeholder={"Confirm Password"}
                placeholderTextColor={"white"}
                secureTextEntry={true}
                onChangeText={second => this.setState({ second })}
              />
            </BottomBorder>
          </Row>
          <Button onPress={() => this.setup(this.state.seed, this.state.first)}>
            <AppText>Login with Seed</AppText>
          </Button>
        </EmptyCol>

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
    align-items: flex-end;
`;
const EmptyCol = styled.View`
    display: flex;
    flex-direction: column;
`;

const BottomBorder = styled.View`
    width:${props => (props.full ? "100%" : "80%")};
    border-bottom-width: 3px;
    border-bottom-color: white;
`;
const TInput = styled.TextInput`
    height: 40px;
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

const ImageButton = styled.Image`
    width:25px;
    height: 25px;
`;

const Button = styled.TouchableOpacity`
    justify-content: center;
    padding: 10px;
    margin:0 10px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

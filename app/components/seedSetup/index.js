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
import randomSeed from "../../libs/crypto";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seed: "" };
  }

  getAccount(seed) {
    Iota.getAccount(seed);
    this.props.navigation.navigate("Home");
  }
  render() {
    return (
      <Col>
        <Row>
          <BottomBorder>
            <TInput
              value={this.state.seed}
              autoCorrect={false}
              placeholder={"Enter Seed"}
              placeholderTextColor={"white"}
              selectTextOnFocus={true}
              onChangeText={seed => this.setState({ seed })}
            />
          </BottomBorder>
          <Button onPress={() => console.log("Get Camera")}>
            <ImageButton source={require("../../assets/scan.png")} />
          </Button>
        </Row>
        <Button onPress={() => this.setState({ seed: randomSeed(81) })}>
          <AppText>Click to generate a seed</AppText>
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
    flex-direction: column;   
    justify-content: center;
    align-items: flex-end;
`;

const BottomBorder = styled.View`
    width: 70%;
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
    padding: 10px;
    margin:0  10px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

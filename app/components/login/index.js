import React from "react";
import styled from "styled-components/native";
import { AppRegistry, StyleSheet, Text, View, TextInput } from "react-native";
import Iota, { Valid } from "../../libs/iota";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  getAccount(seed) {
    Iota.node();
    Iota.getAccount(seed);
    this.props.navigation.navigate("Home");
  }
  render() {
    return (
      <Col>
        <Row>
          <BottomBorder>
            <TInput
              value={this.state.text}
              placeholder={"Enter Password"}
              autoCorrect={false}
              secureTextEntry={true}
              placeholderTextColor={"white"}
              selectTextOnFocus={true}
              onChangeText={text => this.setState({ text })}
              onFocus={() => this.setState({ text: "" })}
            />
          </BottomBorder>

          <Button onPress={() => this.getAccount(this.state.text, this.props)}>
            <AppText>login</AppText>
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
    align-items: center;
    padding: 20px 0;
`;
const Col = styled.View`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    align-items: center;
`;

const BottomBorder = styled.View`
    width: 60%;
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

const Button = styled.TouchableOpacity`
    padding: 10px;
    margin-left: 10px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import Iota, { Valid } from "../../libs/iota";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "Enter Password" };
  }

  render() {
    return (
      <Wrapper>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
          <Text>
            Menu
          </Text>
        </TouchableOpacity>
        <Row>
          <Heading>120</Heading>
          <SubHeading>ti</SubHeading>
        </Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: space-between;
    width:100%;
    height: 20%;
    background-color: rgb(219, 112, 147);
    align-items: center;
    padding: 20px 40px;
`;
const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
    align-items: baseline;
`;

const TInput = styled.TextInput`
    height: 40px;
    color: white;
    font-family: courier;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const Heading = styled.Text`
    color: white;
    font-family: courier;
    font-size: 48px;
`;

const SubHeading = styled.Text`
    color: white;
    font-family: courier;
    font-size: 24px;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    margin-left: 10px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

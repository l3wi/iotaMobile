import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import Iota, { Valid } from "../../libs/iota";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View />;
  }
}

const Wrapper = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: space-between;
    width:100%;
    height: 20%;
    background-color: #004f71;
    align-items: center;
    padding: 10px 40px;
`;
const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
`;

const MenuButtom = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 30px;
`;

const TInput = styled.TextInput`
    height: 40px;
    color: white;
    font-family: courier;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const Page = styled.Text`
    color: white;
    position: absolute;
    left: 29px;
    bottom: 20px;
    font-size: 18px;
`;

const Heading = styled.Text`
    color: white;
    font-size: 48px;
`;

const SubHeading = styled.Text`
    color: white;
    font-size: 24px;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    margin-left: 10px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

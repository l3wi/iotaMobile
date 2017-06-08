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
    return (
      <Wrapper>
        <Row>
          <Long>
            <TInput
              placeholder={"Paste Address"}
              autoCorrect={false}
              placeholderTextColor={"#2d353e"}
            />
          </Long>
        </Row>
        <Row>
          <Short>
            <TInput
              placeholder={"Enter Amount"}
              autoCorrect={false}
              placeholderTextColor={"#2d353e"}
            />
          </Short>
          <Button>
            <Text>
              Gi
            </Text>
          </Button>
        </Row>
        <Row>
          <Long>
            <TInput
              placeholder={"Enter Message"}
              autoCorrect={false}
              placeholderTextColor={"#2d353e"}
            />
          </Long>
        </Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
    display: flex;
    flex-direction: column;   
    justify-content: space-between;
    width:100%;
    align-items: center;
    padding: 10px 40px;
`;
const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
`;

const Long = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    margin-bottom: 10px;
    border-bottom-color: #2d353e;
`;
const Short = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    margin-bottom: 10px;
    border-bottom-color: #2d353e;
`;
const TInput = styled.TextInput`
    height: 40px;
    width: 100%;
    color: white;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const SubHeading = styled.Text`
    color: white;
    font-size: 24px;
`;

const Button = styled.TouchableOpacity`
    flex: .2;
    padding: 10px;
    margin: 10px;
    background-color: #2d353e;
    width: ${props => (props.full ? "100%" : "auto")};
`;

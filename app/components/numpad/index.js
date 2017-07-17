import React, { Component } from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Vibration
} from "react-native";

export default class ManualScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      fontSize: 80
    };
  }

  componentDidMount() {}

  _onPress = value => () => {
    var calc = this.state.value * 10 + value;
    this.setState({ value: calc });
  };
  _onDEL = value => () => {
    var calc = (this.state.value - this.state.value % 10) / 10;
    this.setState({ value: calc });
  };
  _onDouble = value => () => {
    var calc = this.state.value * 100;
    this.setState({ value: calc });
  };

  chargeCard() {
    if (this.state.value < 50) {
      Alert.alert(
        "Amount is to Small",
        "The amount must be over $0.50 to account for Stripe's fees.",
        [{ text: "OK", onPress: () => console.log("OK Pressed!") }]
      );
    } else {
      this.props.navigation.navigate("Charge", { value: this.state.value });
    }
  }

  render() {
    return (
      <Num>
        <Button onPress={this._onPress(1)}>
          <Number>1</Number>
        </Button>
        <Button onPress={this._onPress(2)}>
          <Number>2</Number>
        </Button>
        <Button onPress={this._onPress(3)}>
          <Number>3</Number>
        </Button>
        <Button onPress={this._onPress(4)}>
          <Number>4</Number>
        </Button>
        <Button onPress={this._onPress(5)}>
          <Number>5</Number>
        </Button>
        <Button onPress={this._onPress(6)}>
          <Number>6</Number>
        </Button>
        <Button onPress={this._onPress(7)}>
          <Number>7</Number>
        </Button>
        <Button onPress={this._onPress(8)}>
          <Number>8</Number>
        </Button>
        <Button onPress={this._onPress(9)}>
          <Number>9</Number>
        </Button>
        <Button onPress={this._onDouble()}>
          <Number>00</Number>
        </Button>
        <Button onPress={this._onPress(0)}>
          <Number>0</Number>
        </Button>
        <Button onPress={this._onDEL()}>
          <Number style={{ color: "#295FCC" }}>Next</Number>
        </Button>
      </Num>
    );
  }
}

const width = Dimensions.get("window").width;

const Num = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`;

const Button = styled.TouchableOpacity`
  width: ${width * 0.33 + "px"};
  height: 63px;
  border-top-width: 1px;
  border-left-width: 1px;

  background-color: white;
  border-color: #f0f2f5;
  justify-content: center;
  align-items: center;
`;

const Number = styled.Text`
  color: #3f4234;
  font-size: 20px;
  text-align: center;
`;

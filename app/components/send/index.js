import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Picker,
  TouchableOpacity,
  Alert
} from "react-native";
import { Select, Option } from "react-native-chooser";
import { converter } from "../../libs/utils";
import { iota } from "../../libs/iota";

import Input from "../input";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";

export default class SendForm extends React.Component {
  state = {
    step: 1
  };

  create = (address, amount, unit, message) => {
    // Thanks dom :)
    if (!address) {
      Alert.alert("Address Error", "Address is required");
      return;
    } else if (address.length == 81) {
      Alert.alert("Address Error", "Missing address checksum");
      return;
    } else if (address.length != 90) {
      Alert.alert("Address Error", "Incorrect address length");
      return;
    } else if (isNaN(amount)) {
      Alert.alert("Value Error", "Please enter a valid number");
      return;
    } else if (!iota.valid.isTrytes(this.state.message)) {
      Alert.alert(
        "Message Error",
        "Please enter message with the following valid characters: \n ABCDEFGHIJKLMNOPQRSTUVWXYZ9"
      );
      return;
    }

    const value = converter(amount, unit);
    if (value % 1 != 0) {
      Alert.alert("Amount Error", "You can't send fractions of an IOTA");
      return;
    }

    const transfer = [
      {
        address: address,
        value: parseInt(value, 10),
        message: this.state.message,
        tag: iota.utils.toTrytes("iOSWALLET")
      }
    ];
    if (!iota.valid.isTransfersArray(transfer)) {
      Alert.alert(
        "Transfer Error",
        "The transaction object appears to be invalid. \n Please try again."
      );
      return;
    }

    this.props.sendTransaction(this.props.pwd, 9, 15, transfer);
    this.setState({ address: "", amount: "0", unit: "i", message: "" });
  };

  render() {
    var { step } = this.state;
    console.log(step);
    if (step === 1) {
      return (
        <Wrapper>
          <StepOne navigator={this.props.navigator} />
        </Wrapper>
      );
    } else if (step === 2) {
      return (
        <Wrapper>
          <StepTwo />
        </Wrapper>
      );
    } else {
      return <Text>Hello</Text>;
    }
  }
}

const Wrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

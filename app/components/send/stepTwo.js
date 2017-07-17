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

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      amount: "0",
      unit: "i",
      message: ""
    };
  }

  scan = () => {
    this.props.navigator.showModal({
      screen: "qr", // unique ID registered with Navigation.registerScreen
      passProps: { function: this.fillAddress }, // simple serializable object that will pass as props to the modal (optional)
      animationType: "slide-up" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  };

  fillAddress = data => {
    this.setState({ address: data });
    console.log(data);
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
    var { loading } = this.props;
    return (
      <Wrapper>
        <Padding />
        <Row>
          <Input
            dark
            value={this.state.address}
            placeholder={"Paste Address"}
            autoCorrect={false}
            placeholderTextColor={"#2d353e"}
            onChangeText={address => this.setState({ address })}
          />
          <ScanButton onPress={() => this.scan()}>
            <Image
              source={require("../../assets/icons8-qr_code_filled.png")}
              style={{ width: 40, height: 40 }}
            />
          </ScanButton>
        </Row>
        <Row>
          <Input
            dark
            value={this.state.amount}
            placeholder={"Enter Amount"}
            autoCorrect={false}
            keyboardType={"numeric"}
            placeholderTextColor={"#2d353e"}
            onChangeText={amount => this.setState({ amount })}
          />
          <Select
            onSelect={data => this.setState({ unit: data })}
            defaultText="i"
            style={{
              borderWidth: 0,
              width: 50,
              backgroundColor: "#2d353e",
              alignItems: "center",
              marginLeft: 10
            }}
            transparent={true}
            textStyle={{ fontSize: 18, color: "white" }}
            optionListStyle={{
              borderWidth: 0,
              backgroundColor: "rgba(255,255,255,1)",
              width: 50,
              height: 200
            }}
          >
            <Option value="i">i</Option>
            <Option value="Ki">Ki</Option>
            <Option value="Mi">Mi</Option>
            <Option value="Gi">Gi</Option>
            <Option value="Ti">Ti</Option>
          </Select>
        </Row>
        <Row>
          <Input
            dark
            value={this.state.message}
            placeholder={"Enter Message"}
            autoCorrect={false}
            placeholderTextColor={"#2d353e"}
            onChangeText={message => this.setState({ message })}
          />
        </Row>
        <Row>
          <FullButton
            loading={loading}
            onPress={() =>
              !loading
                ? this.create(
                    this.state.address,
                    this.state.amount,
                    this.state.unit,
                    this.state.message
                  )
                : null}
          >
            <ButtonText>Send Transaction</ButtonText>
          </FullButton>
        </Row>
      </Wrapper>
    );
  }
}

const ScanButton = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 5px;
  width: 50px;
  height: 50px;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 10px 40px;
`;

const Padding = styled.View`padding-top: 30px;`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SubHeading = styled.Text`
  color: white;
  font-size: 24px;
`;

const FullButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  margin: 10px 0;
  background-color: ${props => (props.loading ? "#9ea2a2" : "#2d353e")};
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  flex: .2;
  padding: 10px;
  margin: 10px;
  background-color: #2d353e;
  flex-direction: row;
  justify-content: center;
`;

const ButtonText = styled.Text`color: white;`;

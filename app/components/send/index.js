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
  TouchableOpacity
} from "react-native";
import { Select, Option } from "react-native-chooser";
import { converter } from "../../libs/utils";
import Iota, { Valid } from "../../libs/iota";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      amount: 0,
      unit: "i",
      message: ""
    };
  }

  create = (address, amount, unit, message) => {
    // Thanks dom :)
    if (!address) {
      alert("Address is required");
      return;
    } else if (address.length == 81) {
      alert("Missing address checksum");
      return;
    } else if (address.length != 90) {
      alert("Incorrect address length");
      return;
    }

    const value = parseInt(converter(amount, unit));
    console.log(value);
    const transfer = [
      {
        address: address,
        value: value,
        message: Iota.toTrytes(this.state.message),
        tag: Iota.toTrytes("iOSWALLET")
      }
    ];
    this.setState({ address: "", amount: 0, unit: "i", message: "" });
    this.props.screenProps.send(9, 15, transfer);
  };

  render() {
    return (
      <Wrapper>
        <Padding />
        <Row>
          <Long>
            <TInput
              value={this.state.address}
              placeholder={"Paste Address"}
              autoCorrect={false}
              placeholderTextColor={"#2d353e"}
              onChangeText={address => this.setState({ address })}
            />
          </Long>
        </Row>
        <Row>
          <Short>
            <TInput
              value={this.state.amount}
              placeholder={"Enter Amount"}
              autoCorrect={false}
              keyboardType={"numeric"}
              placeholderTextColor={"#2d353e"}
              onChangeText={amount => this.setState({ amount })}
            />
          </Short>
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
          <Long>
            <TInput
              value={this.state.message}
              placeholder={"Enter Message"}
              autoCorrect={false}
              placeholderTextColor={"#2d353e"}
              onChangeText={message => this.setState({ message })}
            />
          </Long>
        </Row>
        <Row>
          <FullButton
            onPress={() =>
              this.create(
                this.state.address,
                this.state.amount,
                this.state.unit,
                this.state.message
              )}
          >
            <ButtonText>
              Send Transaction
            </ButtonText>
          </FullButton>
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

const Padding = styled.View`
    padding-top: 30px;
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
    color: #2d353e;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const SubHeading = styled.Text`
    color: white;
    font-size: 24px;
`;

const FullButton = styled.TouchableOpacity`
    flex: 1;
    padding: 10px;
    margin: 10px 0;
    background-color: #2d353e;
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

const ButtonText = styled.Text`
    color: white;
`;

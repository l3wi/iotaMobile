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

import Numpad from "../numpad";

import Input from "../input";

export default class StepTwo extends React.Component {
  state = {
    price: 0.3,
    value: "0",
    unit: "Mi"
  };

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

  step = value => () => {
    this.props.step({
      step: 2,
      amount: this.state.value,
      unit: this.state.unit
    });
  };

  render() {
    var { value, unit, price } = this.state;
    var { loading } = this.props;
    return (
      <Wrapper>
        <Col>
          <TotalBox>
            <Row>
              <View />
              <Total>
                {value}
              </Total>
              <TouchableOpacity onPress={this._onDEL()}>
                <Img source={require("../../assets/back.png")} />
              </TouchableOpacity>
            </Row>

            <SubText>
              ${(converter(value, unit) * (price / 1000000)).toFixed(2)} / $
              0.1524
            </SubText>
          </TotalBox>
          <Row>
            <Button>
              <ButtonText>Use Max</ButtonText>
            </Button>
            <Select
              onSelect={data => this.setState({ unit: data })}
              defaultText="Mi"
              style={{
                borderWidth: 2,
                borderRadius: 30,
                borderColor: "#f0f2f5",
                width: 80,
                alignItems: "center"
              }}
              transparent={true}
              textStyle={{ fontSize: 14, color: "#AFB5C5" }}
              optionListStyle={{
                position: "absolute",
                borderWidth: 2,
                borderRadius: 15,
                borderColor: "#f0f2f5",
                backgroundColor: "#fff",
                height: 200
              }}
            >
              <Option value="i">i</Option>
              <Option value="Ki">Ki</Option>
              <Option value="Mi" selected>
                Mi
              </Option>
              <Option value="Gi">Gi</Option>
              <Option value="Ti">Ti</Option>
            </Select>
          </Row>
        </Col>

        <Numpad
          _onDouble={this._onDouble}
          _onDEL={this._onDEL}
          _onPress={this._onPress}
          next={this.step}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  align-items: center;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Col = styled.View`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  border-width: 2px;
  border-radius: 30px;
  border-color: #f0f2f5;
  padding: 13px;
  width: 90px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  color: #afb5c5;
`;

const TotalBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Total = styled.Text`font-size: 42px;`;
const SubText = styled.Text`color: #afb5c5;`;

const Img = styled.Image`
  height: 30px;
  width: 30px;
`;

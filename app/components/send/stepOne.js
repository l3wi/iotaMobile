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
    address: "",
    amount: "0",
    unit: "i",
    message: ""
  };

  render() {
    var { loading } = this.props;
    return (
      <Wrapper>
        <Col>
          <TotalBox>
            <Total>0.00</Total>
            <SubText>$ 0.00 / $ 0.1524</SubText>
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

        <Numpad />
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

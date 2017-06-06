import React from "react";
import styled from "styled-components/native";
import {
  FlatList,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Iota, { Valid } from "../../libs/iota";
import { format, parse } from "date-fns";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var account = this.props.account;
    return (
      <FlatList
        data={account.transfers}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <Item key={index} width={width}>
            <Row>
              <Header {...item[0]}>{item[0].value} <Unit>Gi</Unit></Header>
              <Text>
                {item[0].persistence ? "Confirmed" : "Pending"}
              </Text>
            </Row>
            <Row>
              <Text>No Message</Text>
              <Text>
                {JSON.stringify(item[0].timestamp)}
                {/*{format(parse(item[0].timestamp), "MM/DD/YYYY")}*/}
              </Text>
            </Row>
          </Item>
        )}
      />
    );
  }
}
const { height, width } = Dimensions.get("window");

const Item = styled.View`
    width: ${props => props.width + "px"};
    padding: 20px 50px;
    margin-bottom: 5px;
    background: white;
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
`;

const Header = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
    color: #005629;
`;

const Unit = styled.Text`
    font-size: 26px;
    color: #005629;
`;

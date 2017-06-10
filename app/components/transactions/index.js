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
import format from "date-fns/format";
import parse from "date-fns/parse";
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: false,
      loading: true
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ loading: false, account: props.account });
  }

  componentDidMount() {
    this.setState({ account: this.props.account, loading: false });
  }

  render() {
    var { account, loading } = this.state;
    return (
      <FlatList
        data={
          !account
            ? []
            : account.transfers.sort((a, b) => b[0].timestamp - a[0].timestamp)
        }
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
                {getDate(item[0].timestamp)}
              </Text>
            </Row>
          </Item>
        )}
      />
    );
  }
}
const { height, width } = Dimensions.get("window");

const getDate = m => {
  return format(parse(m * 1000), "HH:mm - MM/DD/YYYY");
};
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

import React from "react";
import styled from "styled-components/native";
import {
  FlatList,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import Iota, { Valid } from "../../libs/iota";
import format from "date-fns/format";
import parse from "date-fns/parse";
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: false,
      loading: true,
      modalVisible: false
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ loading: false, account: props.account });
  }

  componentDidMount() {
    this.setState({ account: this.props.account, loading: false });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    var { account, loading } = this.state;
    return (
      <View>
        <FlatList
          data={
            !account
              ? []
              : account.transfers.sort(
                  (a, b) => b[0].timestamp - a[0].timestamp
                )
          }
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Item
              key={index}
              width={width}
              onPress={() => this.setModalVisible(!this.state.modalVisible)}
            >
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
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >

          <ModalBack>
            <Close
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Image
                source={require("../../assets/close.png")}
                style={{ height: 30, width: 30 }}
              />
            </Close>
            <ModalBody>
              <Text>Hello World!</Text>

              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </Button>
            </ModalBody>
          </ModalBack>
        </Modal>

      </View>
    );
  }
}
const { height, width } = Dimensions.get("window");

const ModalBody = styled.View`
  padding: 20px;
  width: 70%;
  background: white;
`;

const Close = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    right: 40px;
`;

const Button = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin: 10px 0;
    background-color: rgba(0,0,0,.3);
`;

const ModalBack = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.70);
`;

const getDate = m => {
  return format(parse(m * 1000), "HH:mm - MM/DD/YYYY");
};
const Item = styled.TouchableOpacity`
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

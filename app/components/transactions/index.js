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
import { formatAmount, getDate } from "../../libs/utils";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: false,
      loading: true,
      item: {},
      modalVisible: false
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ loading: false, account: props.account });
  }

  componentDidMount() {
    this.setState({ account: this.props.account, loading: false });
  }

  setModalVisible(item) {
    this.setState({ item: item, modalVisible: !this.state.modalVisible });
  }

  render() {
    var { item, account, loading } = this.state;
    return (
      <Wrapper>
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
              onPress={() => this.setModalVisible(item[0])}
            >
              <Row>
                <Header {...item[0]}>
                  {formatAmount(item[0].value, "bal")}
                  {" "}
                  <Unit>{formatAmount(item[0].value, "unit")}</Unit>
                </Header>
                {account.addresses.some(addy => addy === item[0].address)
                  ? <Row center>
                      <Text>Recieved</Text>

                      <Image
                        source={require("../../assets/recieved.png")}
                        style={{ width: 30, height: 30, marginLeft: 10 }}
                      />
                    </Row>
                  : <Row center>
                      <Text>Sent</Text>

                      <Image
                        source={require("../../assets/icons8-logout_rounded_filled.png")}
                        style={{ width: 30, height: 30, marginLeft: 10 }}
                      />
                    </Row>}

              </Row>
              <Row>
                <Text>
                  {item[0].persistence ? "Confirmed" : "Pending"}
                </Text>
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
          {item
            ? <ModalBack>
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
                  <Text>Hash:</Text>
                  <Text>{item.hash}</Text>
                  <Text>Bundle:</Text>

                  <Text>{item.bundle}</Text>
                  {!item.persistence
                    ? <Button
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                      >
                        <Word>Replay Transaction</Word>
                      </Button>
                    : null}

                </ModalBody>
              </ModalBack>
            : null}

        </Modal>

      </Wrapper>
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
    background-color: #2d353e;
`;
const Word = styled.Text`
  color: white;
`;

const ModalBack = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.70);
`;

const Wrapper = styled.View`
  flex: 1;
`;
const Item = styled.TouchableOpacity`
    width: ${props => props.width + "px"};
    padding: 5% 10%;
    margin-bottom: 5px;
    background: white;
`;

const Row = styled.View`
    display: flex;
    flex-direction: row;
    align-items: ${props => (props.center ? "center" : "flex-start")};
    justify-content: space-between;
    background: white;
`;

const Header = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const Unit = styled.Text`
    font-size: 26px;
`;

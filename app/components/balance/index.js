import React from "react";
import styled from "styled-components/native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import Iota, { Valid } from "../../libs/iota";
import { formatAmount } from "../../libs/utils";

export default class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: false,
      init: false,
      loading: false,
      node: false
    };
  }

  // componentWillReceiveProps(props) {
  //   this.setState({
  //     account: this.props.account,
  //     loading: this.props.loading,
  //     node: this.props.node
  //   });
  // }

  // componentDidMount() {
  //   this.setState({
  //     account: this.props.account,
  //     loading: this.props.loading,
  //     node: this.props.node,
  //     int: true
  //   });
  // }

  render() {
    var { account, loading, node } = this.props;
    console.log(this.props.navigator);
    return (
      <Wrapper loading={loading}>
        <MenuButtom
          onPress={() =>
            this.props.navigator.toggleDrawer({
              side: "left"
            })}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/icons8-menu.png")}
          />
        </MenuButtom>
        {/*<Page>{routeName}</Page>*/}
        {loading
          ? <Milestone>
              {loading.title}
            </Milestone>
          : null}
        <View />
        <Row>
          <Heading>{formatAmount(account.balance, "bal")}</Heading>
          <SubHeading> {formatAmount(account.balance, "unit")}</SubHeading>
        </Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: space-between;
    width:100%;
    height: 20%;
    background-color: ${props => (props.loading ? "#04a997" : "#2d353e")};
    align-items: center;
    padding: 10px 40px;
`;
const Row = styled.View`
    display: flex;
    flex-direction: row;   
    justify-content: center;
`;

const Milestone = styled.Text`
  position: absolute;
  color: white;
  bottom: 20px;
  right: 30px;
`;

const MenuButtom = styled.TouchableOpacity`
  position: absolute;
  padding: 20px;
  top: 20px;
  left: 10px;
`;

const TInput = styled.TextInput`
    height: 40px;
    color: white;
    font-family: courier;
    text-align: center;
    border-bottom-width: 3px;
    border-bottom-color: white;    
`;

const Page = styled.Text`
    color: white;
    position: absolute;
    left: 29px;
    bottom: 20px;
    font-size: 18px;
`;

const Heading = styled.Text`
    color: white;
    font-size: 48px;
`;

const SubHeading = styled.Text`
    color: white;
    font-size: 24px;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    margin-left: 10px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "auto")};
`;

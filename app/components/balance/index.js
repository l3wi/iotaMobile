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

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: false,
      loading: true,
      node: false
    };
  }

  componentDidMount() {
    this.setState({
      account: this.props.account,
      loading: false,
      node: this.props.node
    });
  }

  render() {
    var { key, routeName } = this.props.navigation.state;
    var { account, loading, node } = this.state;
    console.log(account);
    return (
      <Wrapper>
        <MenuButtom
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/icons8-menu.png")}
          />
        </MenuButtom>
        <Page>{routeName}</Page>
        {/*{node
          ? <Milestone>
              {node.latestMilestoneIndex}
              {" "}
              :
              {" "}
              {node.latestSolidSubtangleMilestoneIndex}

            </Milestone>
          : null}*/}
        <View />
        {!loading
          ? <Row>
              <Heading>{account.balance}</Heading>
              <SubHeading> ti</SubHeading>
            </Row>
          : null}
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
    background-color: #2d353e;
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
  top: 40px;
  left: 30px;
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

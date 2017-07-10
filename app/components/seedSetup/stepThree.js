import React from "react";
import styled from "styled-components/native";
import Input from "../input";

export default props =>
  <EmptyCol>
    <Header>
      Read Carefully
    </Header>
    <AppText body>
      By pressing 'I understand' you have read and understood to the following:
    </AppText>
    <AppText>
      This seed is ONLY stored on your phone. If you phone is lost
      or destroyed the seed can NOT be recovered.
    </AppText>
    <AppText body>
      It is your responsibility to store the seed in a safe place.
    </AppText>
    <AppText body>
      You are using this application at your own risk. There is no implied
      warranty of any form.
    </AppText>
    <AppText body>
      You are content with the security measures outlined on the GitHub page for
      the app.
    </AppText>
    <AppText body>
      If you disagree with any of the above statements please close and delete
      the application.
    </AppText>
    <Row>
      <Button onPress={() => props.step({ step: 2 })}>
        <AppText>Back</AppText>
      </Button>
      <Button
        style={{ backgroundColor: "whitesmoke" }}
        onPress={() => props.setup()}
      >
        <AppText style={{ color: "red" }}>I understand</AppText>
      </Button>
    </Row>
  </EmptyCol>;

const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
`;
const EmptyCol = styled.View`
    width: 100%;
`;

const Button = styled.TouchableOpacity`
    justify-content: center;
    padding: 10px;
    margin:20px 0px;
    margin-bottom: -5px;
    background-color: rgba(255,255,255,.3);
    width: ${props => (props.full ? "100%" : "40%")};
`;

const Header = styled.Text`
    font-size: 20px;
    padding-bottom: 20px;
    color: white;
    text-align: center;
`;

const AppText = styled.Text`
    padding: ${props => (props.body ? "10px 0" : "0px")}
    color: white;
    text-align: left;
`;

import React from "react";
import styled from "styled-components/native";
export default props =>
  <BottomBorder {...props}>
    <Input underlineColorAndroid="transparent" {...props} children={null} />
    {props.children}
  </BottomBorder>;

const BottomBorder = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  min-height: ${props => (props.multiline ? "127px" : "64px")};
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.dark ? "#F5F7FA" : "white")};
`;

const Input = styled.TextInput`
  flex: 1;
  padding-top: ${props => (props.multiline ? "16" : "0")};
  font-size: 16;
  color: ${props => (props.dark ? "#041C4D" : "white")};
  text-align: left;
`;

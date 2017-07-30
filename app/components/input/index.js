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
  padding: 0 10%;
  min-height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.dark ? "#D3D8E8" : "white")};
`;

const Input = styled.TextInput`
  flex: 1;
  color: ${props => (props.dark ? "#D3D8E8" : "white")};
  text-align: left;
`;

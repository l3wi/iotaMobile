import React from "react";
import styled from "styled-components/native";
export default props =>
  <BottomBorder {...props}>
    <Input {...props} />
  </BottomBorder>;

const BottomBorder = styled.View`
    flex: 1;
    border-bottom-width: 3px;
    border-bottom-color: white;
`;

const Input = styled.TextInput`
    height: 40px;
    color: white;
    text-align: center;
`;

import styled, { css } from "styled-components/native";

export const Input = styled.TextInput`
  ${({ theme }) => css`
    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.LG}px;
    color: ${theme.colors.black};
    margin-bottom: 24px;
    background-color: ${theme.colors.input};
  `}
  height: 60px;
  padding: 0 18px;
  border-radius: 18px;
`;
